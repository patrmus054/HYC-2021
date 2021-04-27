pipeline {
	
	agent any
		
	stages {
		
		stage ('azure-voting-app-redis - Checkout') {
			steps {
					checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/patrmus054/HYC-2021']]])
			}
		}
		stage ('Docker Build chat and Push to ACR'){
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
					'''
			}
	    }
        stage ('Docker Build board-server and Push to ACR'){
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
					
					docker login $ACR_LOGINSERVER -u $ACR_ID -p $ACR_PASSWORD
					docker push $IMAGE_NAME_BOARD_SERVER
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
					kubectl apply -f ./k8s_template.yaml
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