# api-gateway/Dockerfile
FROM openjdk:17-jdk-alpine
RUN apk add --no-cache curl
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]