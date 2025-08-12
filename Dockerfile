# Stage 1: Build React frontend
FROM public.ecr.aws/docker/library/node:16-alpine AS frontend-builder
WORKDIR /app/frontend
COPY project-management-frontend/package*.json ./
RUN npm install
COPY project-management-frontend/ ./
RUN npm run build

# Stage 2: Build Java backend
FROM public.ecr.aws/docker/library/maven:3.9.9-amazoncorretto-21 AS backend-builder
WORKDIR /app/backend
COPY e-commerce/pom.xml .
COPY e-commerce/.mvn .mvn
COPY e-commerce/mvnw .
RUN mvn dependency:go-offline
COPY e-commerce/src ./src
# Copy frontend build to backend's static resources location
COPY --from=frontend-builder /app/frontend/build ./src/main/resources/static
RUN mvn package -DskipTests

# Final image
FROM public.ecr.aws/amazoncorretto/amazoncorretto:21
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]