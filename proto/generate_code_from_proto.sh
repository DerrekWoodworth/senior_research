#!/bin/bash

# This file handles running the protoc codegen in a docker container and putting the resulted code in the frontned and backend

# Build docker image to run the protoc in
docker build -t protoc-image .

docker run --rm  -v  $PWD/:/root/ protoc-image
