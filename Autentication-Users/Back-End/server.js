const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: process.env.EUREKA_INSTANCE_APPNAME || 'auth-service',
    instanceId: `${process.env.EUREKA_INSTANCE_HOSTNAME || 'auth-service'}:${process.env.PORT || 3000}`,
    hostName: process.env.EUREKA_INSTANCE_HOSTNAME || 'auth-service',
    ipAddr: process.env.HOST_IP || 'auth-service',
    port: {
      '$': parseInt(process.env.PORT) || 3000,
      '@enabled': true
    },
    vipAddress: process.env.EUREKA_INSTANCE_APPNAME || 'auth-service',
    statusPageUrl: `http://${process.env.EUREKA_INSTANCE_HOSTNAME || 'auth-service'}:${process.env.PORT || 3000}/health`,
    healthCheckUrl: `http://${process.env.EUREKA_INSTANCE_HOSTNAME || 'auth-service'}:${process.env.PORT || 3000}/health`,
    homePageUrl: `http://${process.env.EUREKA_INSTANCE_HOSTNAME || 'auth-service'}:${process.env.PORT || 3000}`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    },
    leaseInfo: {
      renewalIntervalInSecs: 5,
      durationInSecs: 10
    }
  },
  eureka: {
    host: process.env.EUREKA_HOST || 'discovery-server',
    port: parseInt(process.env.EUREKA_PORT) || 8761,
    servicePath: '/eureka/apps/',
    maxRetries: 10,
    requestRetryDelay: 2000,
    fetchRegistry: true,
    registerWithEureka: true
  }
});

// Inicia o cliente Eureka
eurekaClient.start(error => {
  if (error) {
    console.error('Failed to register with Eureka:', error);
  } else {
    console.log('Successfully registered with Eureka');
  }
});

// Adicionar listeners para eventos do cliente
eurekaClient.on('started', () => {
  console.log('Eureka client started');
});

eurekaClient.on('registered', () => {
  console.log('Service registered with Eureka');
});

eurekaClient.on('deregistered', () => {
  console.log('Service deregistered from Eureka');
});

eurekaClient.on('heartbeat', () => {
  console.log('Heartbeat sent to Eureka');
});

// Manipulador de desligamento
process.on('SIGINT', () => {
  eurekaClient.stop();
  process.exit();
});