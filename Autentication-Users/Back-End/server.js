require('dotenv').config();
const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', async (req, res) => {
  try {
    await db.authenticate();
    res.status(200).json({
      status: "UP",
      dbStatus: "CONNECTED",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: "DOWN",
      error: error.message
    });
  }
});

// Configuração do Eureka Client
const eurekaClient = new Eureka({
  instance: {
    app: 'auth-service',
    instanceId: `auth-service:${PORT}`,
    hostName: 'auth-service',
    ipAddr: 'auth-service',
    port: { '$': PORT, '@enabled': true },
    vipAddress: 'auth-service',
    statusPageUrl: `http://auth-service:${PORT}/health`,
    healthCheckUrl: `http://auth-service:${PORT}/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    },
    leaseInfo: {
      renewalIntervalInSecs: 30,
      durationInSecs: 90
    }
  },
  eureka: {
    host: 'discovery-server',
    port: 8761,
    servicePath: '/eureka/apps/',
    maxRetries: 10,
    heartbeatInterval: 30000,
    registryFetchInterval: 30000
  }
});

// Inicialização
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Auth Service rodando em http://${HOST}:${PORT}`);
});

// Eureka Handlers
eurekaClient.start(error => {
  if (error) console.error('Eureka registration failed:', error);
  else console.log('✅ Registrado no Eureka');
});

eurekaClient.on('registered', () => {
  console.log('🔄 Service registered with Eureka');
});

eurekaClient.on('heartbeat', () => {
  console.log('❤️ Heartbeat enviado ao Eureka');
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('🛑 Desregistrando do Eureka...');
  eurekaClient.stop(() => {
    server.close(() => {
      console.log('🚪 Servidor encerrado');
      process.exit();
    });
  });
});