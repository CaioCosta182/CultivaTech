FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /workspace

# Copia TUDO primeiro (simplificado)
COPY . .
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-jammy
VOLUME /tmp
COPY --from=builder /workspace/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]