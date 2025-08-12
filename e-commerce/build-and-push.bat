@echo off

REM Variables
set AWS_REGION=%AWS_DEFAULT_REGION%
if "%AWS_REGION%"=="" set AWS_REGION=eu-central-1
set ECR_REPOSITORY_NAME=ecommerce-app
set IMAGE_TAG=%IMAGE_TAG%
if "%IMAGE_TAG%"=="" set IMAGE_TAG=latest

REM Get AWS Account ID
for /f "tokens=*" %%i in ('aws sts get-caller-identity --query Account --output text') do set AWS_ACCOUNT_ID=%%i

REM ECR Repository URI
set ECR_URI=%AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%

echo Building and pushing to ECR...
echo Repository: %ECR_URI%

REM Create ECR repository if it doesn't exist
aws ecr describe-repositories --repository-names %ECR_REPOSITORY_NAME% --region %AWS_REGION% || aws ecr create-repository --repository-name %ECR_REPOSITORY_NAME% --region %AWS_REGION%

REM Get ECR login token
for /f "tokens=*" %%i in ('aws ecr get-login-password --region %AWS_REGION%') do docker login --username AWS --password-stdin %ECR_URI% < echo %%i

REM Build the application
mvn clean package -DskipTests

REM Build Docker image
docker build -t %ECR_REPOSITORY_NAME%:%IMAGE_TAG% .

REM Tag for ECR
docker tag %ECR_REPOSITORY_NAME%:%IMAGE_TAG% %ECR_URI%:%IMAGE_TAG%

REM Push to ECR
docker push %ECR_URI%:%IMAGE_TAG%

echo Image pushed successfully: %ECR_URI%:%IMAGE_TAG%