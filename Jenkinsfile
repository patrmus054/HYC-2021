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
	    // stage ('Helm Deploy to K8s'){
		// 	steps{
		// 			sh '''
                    
		// 			REPO_NAME="HYC-2021"
		// 			ACR_LOGINSERVER="hyccontainerregistry.azurecr.io"

                	
		// 			NAME="HYC-2021"
		// 			HELM_CHART="./helm/HYC-2021"
					
					
		// 			KUBE_CONTEXT="HYC-2021"
		// 			kubectl config --kubeconfig=/var/lib/jenkins/.kube/config view
		// 			kubectl config set-context $KUBE_CONTEXT
					
					
		// 			helm --kube-context $KUBE_CONTEXT upgrade --install --force $NAME $HELM_CHART --set image.repository=$ACR_LOGINSERVER/board-server --set image.tag=jenkins${BUILD_NUMBER} 
		// 			helm --kube-context $KUBE_CONTEXT upgrade --install --force $NAME $HELM_CHART --set image.repository=$ACR_LOGINSERVER/chat --set image.tag=jenkins${BUILD_NUMBER}

		// 			#If credentials are required for pulling docker image, supply the credentials to AKS by running the following:
		// 			#kubectl create secret -n $NAME docker-registry regcred --docker-server=$ACR_LOGINSERVER --docker-username=$ACR_ID --docker-password=$ACR_PASSWORD 
		// 			'''
		// 		}
		// }
		stage ('Deploy changes to k8s'){
			steps{
			sh '''
			kubectl apply -f ./k8s_template.yaml --token myToken
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