# Fase de build
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de execução
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/property-service-*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]