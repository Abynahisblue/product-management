#!/bin/bash

# Variables
AWS_REGION=${AWS_DEFAULT_REGION:-eu-central-1}
ECR_REPOSITORY_NAME="ecommerce-app"
IMAGE_TAG=${IMAGE_TAG:-latest}

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# ECR Repository URI
ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}"

echo "Building and pushing to ECR..."
echo "Repository: ${ECR_URI}"

# Create ECR repository if it doesn't exist
aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} || \
aws ecr create-repository --repository-name ${ECR_REPOSITORY_NAME} --region ${AWS_REGION}

# Get ECR login token
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}

# Build the application
mvn clean package -DskipTests

# Build Docker image
docker build -t ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} .

# Tag for ECR
docker tag ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} ${ECR_URI}:${IMAGE_TAG}

# Push to ECR
docker push ${ECR_URI}:${IMAGE_TAG}

echo "Image pushed successfully: ${ECR_URI}:${IMAGE_TAG}"