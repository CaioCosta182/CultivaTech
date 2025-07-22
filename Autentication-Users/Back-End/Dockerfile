FROM node:18.20.2-alpine

WORKDIR /app

# Instala curl para healthchecks e jq para manipulação de JSON
RUN apk add --no-cache curl jq

# Cria package.json mínimo para instalação inicial
RUN echo '{"dependencies":{"eureka-js-client":"4.5.0"}}' > package.json

# Instala o eureka-js-client primeiro com flags especiais
RUN npm install eureka-js-client@4.5.0 --legacy-peer-deps --ignore-scripts

# Copia o package.json real
COPY package.json .

# Instala outras dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Configura como ES Module (usando jq)
RUN echo '{"type":"module"}' > temp.json && \
    jq -s '.[0] * .[1]' package.json temp.json > temp2.json && \
    mv temp2.json package.json && \
    rm temp.json

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=30s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "server.js"]