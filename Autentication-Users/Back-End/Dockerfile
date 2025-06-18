# Base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia dependências
COPY package*.json ./
RUN npm install

# Copia o restante
COPY . .

# Expõe a porta (ajuste se for diferente)
EXPOSE 3000

RUN apt-get update && apt-get install -y default-mysql-client

# Comando para iniciar
CMD ["node", "server.js"]
