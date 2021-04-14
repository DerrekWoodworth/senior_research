#!/bin/bash
HASH=$(git rev-parse HEAD)

# Build each docker container with their respective Dockerfiles
docker build -t envoy -f Dockerfile.envoy . 
docker build -t backend -f Dockerfile.proto_and_backend . 
docker build -t frontend -f Dockerfile.proto_and_frontend . 


# Tag all the images for remote repo
docker tag envoy dwoodworth414/jace:envoy-$HASH
docker tag backend dwoodworth414/jace:backend-$HASH
docker tag frontend dwoodworth414/jace:frontend-$HASH

# Push all images
docker push dwoodworth414/jace:envoy-$HASH
docker push dwoodworth414/jace:backend-$HASH
docker push dwoodworth414/jace:frontend-$HASH

echo Updating kubernetes pods to refrence latest version...
sed --regexp-extended 's/(^.*image.*-)(.*)/\1'"$HASH"'/' -i kube/backend.yaml kube/frontend.yaml kube/backend.yaml kube/envoy.yaml

