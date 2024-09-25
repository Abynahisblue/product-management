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
                    sh 'docker run -d --name ecommerceapi -p 8081:8081 productmgmt'
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