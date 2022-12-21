eval $(minikube docker-env)\
&& minikube addons enable ingress\
\
&& docker build -t client:0.1 -f client/Dockerfile .\
&& kubectl apply -f k8s/client/deployment.yaml\
&& kubectl apply -f k8s/client/service.yaml\
&& kubectl apply -f k8s/client/ingress.yaml\
\
&& docker build -t todos:0.1 -f services/todos/Dockerfile .\
&& kubectl apply -f k8s/todos/deployment.yaml\
&& kubectl apply -f k8s/todos/service.yaml\
&& kubectl apply -f k8s/todos/ingress.yaml
