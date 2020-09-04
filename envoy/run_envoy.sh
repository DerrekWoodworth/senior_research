#!/bin/bash

echo Starting Envoy proxy...
realname=$(realpath $0)
containerid=$(docker run -d -p 8082:8082 -p 8081:8081 -v $PWD:/etc/envoy/ envoyproxy/envoy-dev)

# Write the container id to a file (essentially a pid file)
echo $containerid > ../running/envoy
echo Envoy container id: $containerid stored at ../running/envoy
