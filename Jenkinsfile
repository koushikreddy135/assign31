pipeline {
    agent any

    stages {

        stage('Build Backend Image') {
            steps {
                dir('ecommerce-app/backend') {
                    sh 'docker build -t backend-app .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('ecommerce-app/frontend') {
                    sh 'docker build -t frontend-app .'
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                sh 'docker rm -f backend-app || true'
                sh 'docker run -d -p 5001:5000 --name backend-app backend-app'
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh 'docker rm -f frontend-app || true'
                sh 'docker run -d -p 3001:3000 --name frontend-app frontend-app'
            }
        }

    }
}
