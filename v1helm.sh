eval $(minikube docker-env)\
&& minikube addons enable ingress\
&& docker build -t send:0.1 -f services/notification/Dockerfile .\
&& docker build -t todos:0.1 -f services/todos/Dockerfile .\
&& docker build -t client:0.1 -f client/Dockerfile .\
&& cd helm\
&& helm install local v1\
&& cd ..
