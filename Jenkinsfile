pipeline {
	
	agent any
		
	stages {
		
		stage ('git checkout') {
			steps {
					checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/patrmus054/HYC-2021']]])
			}
		}
		stage ('Docker Build frontend and Push to ACR & Docker Hub'){
			steps{
					
					sh '''														
					docker login -u i529998 -p '#MdouTCJg246'
					cd ./chat
					docker build -t storefront:latest .
					docker tag storefront:latest i529998/storefront:latest
					docker push i529998/storefront:latest
					docker run -p 3001:3000 -d storefront 
					cd ..
					'''
			}
	    }
        stage ('Docker Build backend and Push to ACR & Docker Hub'){
			steps{
					
					sh '''
					docker login -u i529998 -p '#MdouTCJg246'
					cd ./board-server
					docker build -t backend:latest .
					docker tag backend:latest i529998/backend:latest
					docker push i529998/backend:latest
					docker run -d backend 
					cd ..
					'''
			}
	    }
	}

	post { 
		always { 
			echo 'Build Steps Completed'
		}
	}
}