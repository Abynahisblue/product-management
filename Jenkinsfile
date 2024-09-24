pipeline {
    agent any
    tools {
        jdk 'JDK' // Ensure this matches the name configured in Jenkins -> Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                // Cloning the specified branch from the GitHub repository
                git branch: 'jenkins', url: 'https://github.com/Abynahisblue/product-management.git'
            }
        }

        stage('Build') {
            steps {
                // Use Maven Wrapper for Windows; `mvnw.cmd` is for Windows environments
                bat '.\\mvnw.cmd clean package'
            }
        }

        stage('Test') {
            steps {
                // Running tests using Maven Wrapper
                bat '.\\mvnw.cmd test'
            }
        }

        stage('Docker Compose Down') {
            steps {
                script {
                    // Stops and removes containers; `--remove-orphans` will remove any orphan containers
                    bat 'docker compose down --remove-orphans || exit 0' // Does not fail if no containers are running
                }
            }
        }

        stage('Docker Compose Up --build') {
            steps {
                script {
                    // Use --build to rebuild images before starting services
                    bat 'docker compose up --build -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Build succeeded'
        }

        failure {
            echo 'Build failed'
        }
    }
}
