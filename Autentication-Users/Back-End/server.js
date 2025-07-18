// Configuração do Eureka deve usar variáveis de ambiente
const eurekaClient = new Eureka({
  instance: {
    app: process.env.EUREKA_INSTANCE_APPNAME || 'auth-service',
    hostName: process.env.EUREKA_INSTANCE_HOSTNAME || 'localhost',
    ipAddr: process.env.INSTANCE_IP || '127.0.0.1',
    port: {
      '$': parseInt(process.env.PORT) || 3000,
      '@enabled': true
    },
    vipAddress: process.env.EUREKA_INSTANCE_APPNAME || 'auth-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: process.env.EUREKA_HOST || 'discovery-server',
    port: parseInt(process.env.EUREKA_PORT) || 8761,
    servicePath: '/eureka/'
  }
});