pipeline {
    agent any
    tools {
        jdk 'JDK' // Ensure this matches the name configured in Jenkins -> Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                git branch:'jenkins' url:'https://github.com/Abynahisblue/product-management.git' // Clone your repo
            }
        }
        stage('Build') {
            steps {
                bat 'chmod +x mvnw' // Make the Maven wrapper executable
                bat './mvnw clean package' // Build the project using Maven
            }
        }
        stage('Test') {
            steps {
                bat'./mvnw test' // Run tests using Maven
            }
        }
        stage('Docker Compose Down') {
            steps {
                script {
                    // Bring down any running containers, removing orphans
                    bat 'docker compose down --remove-orphans'
                }
            }
        }
        stage('Docker Compose Up --build') {
            steps {
                script {
                    // Use --build to force a rebuild of the Docker images before starting the services
                    bat 'docker compose up --build -d'
                }
            }
        }
    }
    post {
        success {
            echo "Build succeeded"
        }
        failure {
            echo "Build failed"
        }
    }
}