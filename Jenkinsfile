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
                // Use Maven Wrapper for Windows; `mvnw.cmd` is for Windows environments
                sh './mvnw clean package'
            }
        }


        stage('Docker Compose Down') {
            steps {
                script {
                    // Stops and removes containers; `--remove-orphans` will remove any orphan containers
                    sh 'docker compose down --remove-orphans || exit 0' // Does not fail if no containers are running
                }
            }
        }

        stage('Docker Compose Up --build') {
            steps {
                script {
                    // Use --build to rebuild images before starting services
                    sh 'docker compose up --build -d'
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
