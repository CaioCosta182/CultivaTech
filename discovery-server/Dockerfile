FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /workspace
COPY . .
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-jammy
RUN apt-get update && apt-get install -y curl
COPY --from=builder /workspace/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]