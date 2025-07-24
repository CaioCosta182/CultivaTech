import express from "express";
import { Eureka } from "eureka-js-client";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares e rotas do seu frontend/backend
app.use(express.static("build")); // Se servir arquivos React
app.use(express.json());

// ✅ Endpoint de Health Check (OBRIGATÓRIO para o Eureka)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// ✅ Configuração do Eureka Client
const eurekaClient = new Eureka({
  instance: {
    app: "auth-frontend", // Nome que aparecerá no Eureka
    instanceId: `auth-frontend:${PORT}:${process.env.HOSTNAME || "local"}`,
    hostName: process.env.HOSTNAME || "auth-frontend", // Nome do container no Docker
    ipAddr: "172.20.0.X", // ❗ Substitua pelo IP real do container (use `docker inspect`)
    port: {
      $: PORT,
      "@enabled": true,
    },
    vipAddress: "auth-frontend",
    statusPageUrl: `http://${
      process.env.HOSTNAME || "auth-frontend"
    }:${PORT}/health`,
    healthCheckUrl: `http://${
      process.env.HOSTNAME || "auth-frontend"
    }:${PORT}/health`,
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
    leaseInfo: {
      renewalIntervalInSecs: 10, // Tenta renovar a cada 10s
      durationInSecs: 30, // Remove após 30s se não receber heartbeat
    },
  },
  eureka: {
    host: "discovery-server", // Nome do serviço Eureka no docker-compose.yml
    port: 8761,
    servicePath: "/eureka/apps/",
    maxRetries: 3,
    heartbeatInterval: 5000, // Envia heartbeat a cada 5s
  },
});

// Inicia o servidor e registra no Eureka
app.listen(PORT, () => {
  console.log(`✅ auth-frontend rodando na porta ${PORT}`);
  eurekaClient.start((error) => {
    if (error) {
      console.error("❌ Falha ao registrar no Eureka:", error);
    } else {
      console.log("📡 Registrado no Eureka como auth-frontend");
    }
  });
});

// Desregistra ao encerrar (ex: Ctrl+C)
process.on("SIGINT", () => {
  eurekaClient.stop();
  process.exit();
});
