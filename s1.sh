docker system prune -a -f\
&& minikube delete\
&& minikube start\
&& minikube tunnel
