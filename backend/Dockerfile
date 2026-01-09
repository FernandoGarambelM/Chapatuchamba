# ETAPA 1: Construcción (Build)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# Construimos el jar saltando los tests para ir rápido
RUN mvn clean package -DskipTests

# ETAPA 2: Ejecución (Run)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copiamos solo el JAR cocinado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar
# Exponemos el puerto 8080
EXPOSE 8080
# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
