# api-gateway/Dockerfile
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /workspace
COPY . .
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre
VOLUME /tmp
COPY --from=builder /workspace/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]