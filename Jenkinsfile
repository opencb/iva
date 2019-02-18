pipeline {
    agent any
    stages {
        stage ('Docker Build and Push') {
            when {
              allOf {
                      branch 'develop'
                      buildingTag()
              }
            }
            options {
                timeout(time: 25, unit: 'MINUTES')
            }
            steps {
                    sh 'docker build  -t opencb/iva:${tag} -f docker/Dockerfile .
                    withDockerRegistry([ credentialsId: "wasim-docker-hub", url: "" ]) {
                       sh "docker push opencb/iva:${tag}"
                   }
           }
       }
  }
}

