#!/bin/bash

# NOT TO BE RUN MANUALLY

# This script is to be run by the proto-image to handle all the codegen for the proto files

echo Building backend using protoc...
# Backend codegen
protoc --clojure_out=grpc-server:../backend/src --proto_path=../backend/resources ../backend/resources/container.proto

