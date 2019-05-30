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
	    stage ('Docker Build and Push') {
            options {
                timeout(time: 25, unit: 'MINUTES')
            }
            when {
                branch "master"
            }
 		    steps {
	            script {
                    def tag = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
		            sh "docker build  -t opencb/iva:'${tag}' -f docker/Dockerfile ."
                    withDockerRegistry([ credentialsId: "wasim-docker-hub", url: "" ]) {
	       			    sh "docker push opencb/iva:'${tag}'"
			        }
		        }
           }
       }
    }
}

