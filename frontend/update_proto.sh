#!/bin/bash

# Rewrites the protocode
protoc --plugin=protoc-gen-ts=/mnt/c/Users/derrek/Desktop/senior_research/frontend/node_modules/.bin/protoc-gen-ts --js_out="import_style=commonjs,binary:src/app/generated" --ts_out="service=grpc-web:src/app/generated" --proto_path /mnt/c/Users/derrek/Desktop/senior_research/frontend/proto/ container.proto
