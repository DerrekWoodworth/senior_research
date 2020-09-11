#!/bin/bash

# NOT TO BE RUN MANUALLY

echo Building frontend using protoc...
# Frontend codegen
bash -c 'cd ../frontend; npm install; protoc --js_out="import_style=commonjs,binary:src/app/generated" --grpc-web_out=import_style=typescript,mode=grpcwebtext:src/app/generated --proto_path ../proto/proto/ ../proto/proto/*'
