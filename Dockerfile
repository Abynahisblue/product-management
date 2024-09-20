# Step 1: Use a base image with JDK to build the project
FROM eclipse-temurin:21-jdk-jammy AS builder

# Set the working directory inside the container
WORKDIR /build

# Copy the project files into the container
COPY . .

# Build the project using Maven, skipping tests
RUN ./mvnw clean package -DskipTests

# Step 2: Use a smaller JRE-based image to run the JAR
FROM eclipse-temurin:21-jre-jammy

# Set the working directory inside the container for the runtime
WORKDIR /app

# Copy the generated JAR from the builder stage
COPY --from=builder /build/target/*.jar /app/app.jar

# Expose the port that the Spring Boot app runs on
EXPOSE 8080

# Command to run the Spring Boot app
CMD ["java", "-jar", "/app/app.jar"]
