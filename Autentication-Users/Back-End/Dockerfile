# Usa imagem Node.js compatível com ARM (evita problemas no Alpine)
FROM --platform=linux/amd64 node:18.20.2-alpine

WORKDIR /app

# Instala dependências de sistema (curl, jq) + bibliotecas para Eureka (Java-like discovery)
RUN apk add --no-cache \
    curl \
    jq \
    openjdk11-jre-headless  # Necessário para Eureka Client

# Cache de dependências (melhora rebuilds)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --ignore-scripts

# Copia o resto do código
COPY . .

# Configura como ES Module (alternativa mais limpa)
RUN jq '. + {"type":"module"}' package.json > temp.json && \
    mv temp.json package.json

# Healthcheck otimizado
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

RUN apk add --no-cache mysql-client

CMD ["node", "--enable-source-maps", "server.js"]  # Habilita source maps para debugging