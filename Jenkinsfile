node {
    stage('Git Checkout ') {
        git credentialsId: '{pre-credentials}', url: 'https://github.com/agthumbi/autocheck-api.git'
    }
    stage('Build Docker Image and push to repo') {
        sh   "docker build . -t {docker repo link hear}.${BUILD_NUMBER} --no-cache=true "
        sh "docker push {docker repo link hear}.${BUILD_NUMBER}"
    }
    def remote = [:]

    remote.name = '{name}'
    remote.host = '{name}'
    remote.user = '{user}'
    remote.password = '{pwd}'

    remote.allowAnyHosts = true
    stage('Deploy docker image')
   {
        def exportStartup = "sudo wget -N --no-cache -O startup.sh  {startup.sh path on distributed server}"
        def dockerValidate = "sudo bash startup.sh autocheck-api"
        def dockerRun = "sudo docker run -dit --name autocheck-api  -p 80:3000  --dns=8.8.8.8 --restart on-failure {docker repo link hear}.${BUILD_NUMBER}"
            sshCommand remote: remote, command: "${exportStartup}"
        sshCommand remote: remote, command: "${dockerValidate}"
        sshCommand remote: remote, command: "${dockerRun}"
   }
}