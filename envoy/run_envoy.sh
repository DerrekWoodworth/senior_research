#!/bin/bash

echo Starting envoy...
realname=$(realpath $0)
containerid=$(docker run -d --rm --network=host -p 8082:8082 -p 8081:8081 -v $(dirname $realname):/etc/envoy/ envoyproxy/envoy-dev)

# Write the container id to a file (essentially a pid file)
echo $containerid > $(dirname $(dirname $realname))/running/envoy
echo Envoy container id: $containerid stored at ../running/envoy
