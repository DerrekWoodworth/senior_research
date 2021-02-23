#!/bin/bash
HASH=$(git rev-parse HEAD)
#docker build -t envoy -f Dockerfile.envoy .
#docker tag envoy dwoodworth414/jace:envoy-$HASH
#docker build -t backend -f Dockerfile.proto_and_backend .
#docker tag backend dwoodworth414/jace:backend-$HASH
#docker build -t frontend -f Dockerfile.proto_and_frontend .
#docker tag frontend dwoodworth414/jace:frontend-$HASH
#docker push -a dwoodworth414:/jace

echo Updating kubernetes pods to refrence latest version...
sed 's/TAG/'"$HASH"'/' -i kube/frontend.yaml
minikube kubectl -- apply -f kube/
