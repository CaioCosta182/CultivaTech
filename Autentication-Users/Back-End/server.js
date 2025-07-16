import { Eureka } from 'eureka-js-client';

// Configuração do Eureka (APÓS as importações, ANTES do app.listen)
const eurekaClient = new Eureka({
  instance: {
    app: 'auth-service',
    instanceId: 'auth-service:3000',
    hostName: 'auth-service', // Nome do container no Docker
    ipAddr: process.env.HOST_IP || 'localhost',
    statusPageUrl: 'http://auth-service:3000',
    healthCheckUrl: 'http://auth-service:3000/health',
    port: {
      '$': 3000,
      '@enabled': true,
    },
    vipAddress: 'auth-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'discovery-server', // Nome do serviço Eureka no compose
    port: 8762,
    servicePath: '/eureka/apps/',
  },
});

// Endpoint de saúde (ANTES do app.listen)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Inicia cliente Eureka (APÓS app.listen)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  eurekaClient.start(error => {
    console.log(error || 'Registrado no Eureka');
  });
});

// Encerramento elegante
process.on('SIGINT', () => {
  eurekaClient.stop();
  process.exit();
});