# # api-gateway/Dockerfile
# FROM maven:3.9.6-eclipse-temurin-17 AS builder
# WORKDIR /workspace
# COPY . .
# RUN mvn package -DskipTests

# FROM eclipse-temurin:17-jre
# VOLUME /tmp
# COPY --from=builder /workspace/target/*.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

# Estágio de build (compilação do código Java)
FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

# Estágio final (imagem de execução da aplicação)
FROM eclipse-temurin:17-jre
VOLUME /tmp
# Corrigido: Copia o JAR para um diretório /app/
# O nome do JAR é geralmente [nome-do-projeto]-[versao].jar
# Você precisa garantir que o nome do JAR esteja correto aqui.
# Ex: se o seu JAR for api-gateway-0.0.1-SNAPSHOT.jar
COPY --from=builder /workspace/target/api-gateway-0.0.1-SNAPSHOT.jar /app/api-gateway.jar

# Exponha a porta da aplicação (se aplicável)
EXPOSE 8080

# Defina o ponto de entrada da aplicação
# O java -jar agora aponta para o JAR dentro do diretório /app/
ENTRYPOINT ["java", "-jar", "/app/api-gateway.jar"]