#!/bin/bash

# NOT TO BE RUN MANUALLY

echo Building frontend using protoc...
# Frontend codegen
bash -c 'cd ../frontend; npm install; protoc --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts --js_out="import_style=commonjs,binary:src/app/generated" --ts_out="service=grpc-web:src/app/generated" --proto_path ../proto/proto/ ../proto/proto/*'
