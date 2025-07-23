FROM openjdk:17-jdk-alpine
# Instala curl para healthcheck
RUN apk add --no-cache curl
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]