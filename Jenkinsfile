pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Cloning the specified branch from the GitHub repository
                git branch: 'jenkins', url: 'https://github.com/Abynahisblue/product-management.git'
            }
        }
         stage('Build') {
                    steps {
                        script {
                            bat 'cmd /c .\\mvnw.cmd clean package'
                        }
                    }
                }


        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    // Use bat for Windows commands instead of sh
                    bat 'docker compose down || exit 0' // Stops and removes containers, but does not fail if none are running
                    bat 'docker compose build' // Builds the Docker images
                    bat 'docker compose up -d' // Starts the Docker containers in detached mode
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
