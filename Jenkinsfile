pipeline {
    agent any
    stages {
         stage ('Build') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                sh 'cd lib/jsorolla && npm install && cd ../.. && npm install --unsafe-perm && npm run build'
            }
        }
	stage ('Docker Build and Push') {
            options {
                timeout(time: 25, unit: 'MINUTES')
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

