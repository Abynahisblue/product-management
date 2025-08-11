# E-Commerce Product Management System

A Spring Boot application with PostgreSQL database integration, designed for AWS deployment with RDS multi-AZ failover and Parameter Store integration.

## Features
- PostgreSQL database with JPA/Hibernate
- AWS Parameter Store integration for secure credential management
- Image metadata storage for S3 integration
- Paginated product listings
- Binary tree-based product categorization
- Docker containerization ready
- AWS ECS deployment ready

## Prerequisites
- Java 21
- Maven 3.6+
- Docker (for local development)
- AWS CLI configured (for Parameter Store)

## Local Development Setup

1. **Using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Manual Setup:**
   - Install PostgreSQL locally
   - Create database: `ecommerce`
   - Set environment variables:
     ```bash
     export DB_USERNAME=your_username
     export DB_PASSWORD=your_password
     export DB_HOST=localhost
     export DB_PORT=5432
     export DB_NAME=ecommerce
     ```
   - Run: `mvn spring-boot:run`

## AWS Deployment Configuration

### Parameter Store Setup
Create the following parameters in AWS Systems Manager Parameter Store:
- `/ecommerce/db/username` - Database username
- `/ecommerce/db/password` - Database password (SecureString)

### Environment Variables for ECS
- `DB_HOST` - RDS endpoint
- `DB_PORT` - Database port (5432)
- `DB_NAME` - Database name
- `AWS_REGION` - AWS region
- `SPRING_PROFILES_ACTIVE` - Application profile (prod)

## Database Schema
The application automatically creates the following tables:
- `products` - Product information
- `categories` - Category hierarchy (binary tree)
- `image_metadata` - S3 image metadata

## API Endpoints
- `GET /api/products` - List products (paginated)
- `POST /api/products` - Create product
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `GET /actuator/health` - Health check
