# FROM eclipse-temurin:17-jdk AS builder
# WORKDIR /workspace
# COPY . .
# RUN chmod +x mvnw
# RUN ./mvnw package -DskipTests

# FROM eclipse-temurin:17-jre
# VOLUME /tmp
# COPY --from=builder /workspace/target/*.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

# ... (outras linhas do Dockerfile) ...

FROM maven:3.8.5-openjdk-17 AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-jre
VOLUME /tmp
# Corrigido: Copia o JAR para um diretório /app/
# O nome do JAR deve ser EXATAMENTE o que o Maven gera.
COPY --from=builder /workspace/target/farm-production-1.0.0.jar /app/farm-production.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/farm-production.jar"]