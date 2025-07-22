import Eureka from 'eureka-js-client';

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
  console.log(error || 'Eureka client started');
});

// Manipulador de desligamento
process.on('SIGINT', () => {
  eurekaClient.stop();
  process.exit();
});