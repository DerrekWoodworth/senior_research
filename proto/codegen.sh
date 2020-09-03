#!/bin/bash

# NOT TO BE RUN MANUALLY

# This script is to be run by the proto-image to handle all the codegen for the proto files

# Backend codegen
protoc --clojure_out=grpc-server:../backend/src --proto_path=../backend/resources ../backend/resources/container.proto

# Frontend codegen
protoc --plugin=protoc-gen-ts=../frontend/node_modules/.bin/protoc-gen-ts --js_out="import_style=commonjs,binary:../frontend/src/app/generated" --ts_out="service=grpc-web:../frontend/src/app/generated" --proto_path ../frontend/proto/ container.proto
