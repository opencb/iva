pipeline {
    agent any
    stages {
        stage ('Build source code') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                sh 'npm install --unsafe-perm && npm run build'
            }
        }
	    stage ('Build and Push Stable Docker') {
            options {
                timeout(time: 25, unit: 'MINUTES')
            }
            when {
                branch "master"
            }
 		    steps {
	            script {
                    def tag = sh(returnStdout: true, script: "node -p \"require('./package.json').version\"").trim()
		            sh "docker build  -t opencb/iva:'${tag}' -f docker/Dockerfile ."
                    withDockerRegistry([ credentialsId: "wasim-docker-hub", url: "" ]) {
	       			    sh "docker push opencb/iva:'${tag}'"
			        }
		        }
           }
        }
        stage ('Build and Push Development Docker') {
            options {
                timeout(time: 25, unit: 'MINUTES')
            }
            when {
                branch "develop"
            }
        	steps {
       	        script {
                    def tag = sh(returnStdout: true, script: "node -p \"require('./package.json').version\"").trim()
       		        sh "docker build  -t opencb/iva:'${tag}' -f docker/Dockerfile ."
                    withDockerRegistry([ credentialsId: "wasim-docker-hub", url: "" ]) {
       	       		    sh "docker push opencb/iva:'${tag}'"
       			    }
       		    }
            }
        }
    }
}

