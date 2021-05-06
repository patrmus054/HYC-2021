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
					REPO_NAME="HYC-2021"
					ACR_LOGINSERVER="hyccontainerregistry.azurecr.io"
					ACR_ID="hycContainerRegistry"
					ACR_PASSWORD="yhQj0LuE7SO18Y0wdeRKmhtP/UNdHsdF"
					IMAGE_NAME_CHAT="$ACR_LOGINSERVER/chat:jenkins${BUILD_NUMBER}"

					
					cd ./chat
					docker build -t $IMAGE_NAME_CHAT .
					cd ..
					
					docker login $ACR_LOGINSERVER -u $ACR_ID -p $ACR_PASSWORD
					docker push $IMAGE_NAME_CHAT

					docker logout 
					docker login -u i529998 -p '#MdouTCJg246'
					cd ./chat
					docker build -t storefront:latest .
					docker tag storefront:latest i529998/storefront:latest
					docker push i529998/storefront:latest
					cd ..
					'''
			}
	    }
        stage ('Docker Build backend and Push to ACR & Docker Hub'){
			steps{
					
					sh '''
					REPO_NAME="HYC-2021"
					ACR_LOGINSERVER="hyccontainerregistry.azurecr.io"
					ACR_ID="hycContainerRegistry"
					ACR_PASSWORD="yhQj0LuE7SO18Y0wdeRKmhtP/UNdHsdF"

					IMAGE_NAME_BOARD_SERVER="$ACR_LOGINSERVER/board-server:jenkins${BUILD_NUMBER}"
					

					
					cd ./board-server
					docker build -t $IMAGE_NAME_BOARD_SERVER .
					cd ..
					docker logout
					docker login $ACR_LOGINSERVER -u $ACR_ID -p $ACR_PASSWORD
					docker push $IMAGE_NAME_BOARD_SERVER

					docker logout 
					docker login -u i529998 -p '#MdouTCJg246'
					cd ./board-server
					docker build -t backend:latest .
					docker tag backend:latest i529998/backend:latest
					docker push i529998/backend:latest
					cd ..
					'''
			}
	    }

		stage ('Deploy changes to k8s'){
			steps{
			sh '''
			az login
			az account set -s fd742966-e32f-4436-995b-709191fe1186
			az aks get-credentials --resource-group HYC --name hycCluster

			kubectl version
			kubectl get pods
			kubectl apply -f ./k8s_template.yaml --token myToken
			kubectl get pod | awk '{if(NR>1)print $1}' | xargs kubectl delete pod
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