#!/bin/bash

# This file handles running the protoc codegen in a docker container and putting the resulted code in the frontned and backend
realname=$(realpath $0)


# Build docker image to run the protoc in
docker build -t protoc-backend -f $(dirname $realname)/Dockerfile.backend $(dirname $realname)

docker run --rm  -v $(dirname $(dirname $realname)):/root/senior_research protoc-backend /bin/bash -c "cd /root/senior_research/proto; ./codegen_backend.sh"

docker build -t protoc-frontend -f $(dirname $realname)/Dockerfile.frontend $(dirname $realname)
# Do the same thing with node for the frontend
docker run --rm  -v $(dirname $(dirname $realname)):/root/senior_research protoc-frontend /bin/bash -c "cd /root/senior_research/proto; ./codegen_frontend.sh"
