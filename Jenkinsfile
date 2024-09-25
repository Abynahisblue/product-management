pipeline {
    agent any


    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkins', url: 'https://github.com/Abynahisblue/product-management.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package'
                }
            }
        }

        stage('Build and Deploy with Docker Compose') {
            steps {
                script {

                    sh 'docker compose down'
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}