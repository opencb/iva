pipeline {
    agent any
    stages {
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

