pipeline {
    agent any
    stages {
        stage ('Docker Build and Push') {
            when {
              allOf {
                      branch 'develop'
              }
            }
            options {
                timeout(time: 25, unit: 'MINUTES')
            }
            steps {
	        script {
	                def tag = sh(returnStdout: true, script: "git tag --contains | head -1").trim()
               }
	       sh "docker build  -t opencb/iva:'${tag}' -f docker/Dockerfile ."
	       withDockerRegistry([ credentialsId: "wasim-docker-hub", url: "" ]) {
	       sh "docker push opencb/iva:'${tag}'"
              }
           }
       }
  }
}

