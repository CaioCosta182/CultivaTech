FROM eclipse-temurin:17-jdk AS builder
WORKDIR /workspace
COPY . .
RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre
VOLUME /tmp
COPY --from=builder /workspace/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]