FROM node:18.20.2-alpine

WORKDIR /app

# Instala dependências de sistema (curl, jq) + bibliotecas para Eureka (Java-like discovery)
RUN apk add --no-cache \
    curl \
    jq \
    openjdk11-jre-headless  # Necessário para Eureka Client

# Cache de dependências (melhora rebuilds)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --ignore-scripts

# Copia o restante do código
COPY . .

# Configura como ES Module (usando jq)
RUN echo '{"type":"module"}' > temp.json && \
    jq -s '.[0] * .[1]' package.json temp.json > temp2.json && \
    mv temp2.json package.json && \
    rm temp.json

# Healthcheck otimizado
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "server.js"]