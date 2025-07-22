FROM node:18.20.2-alpine

WORKDIR /app

# Instala dependências necessárias
RUN apk add --no-cache curl

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia o código fonte
COPY . .

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "server.js"]