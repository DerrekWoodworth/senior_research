#!/bin/bash

echo Starting backend...
realname=$(realpath $0)
containerid=$(docker run -d --rm -p 8080:8080 -v $(dirname $realname):/root/backend clojure:lein /bin/bash -c "cd /root/backend; lein run")


# Write the container id to a file (essentially a pid file)
echo $containerid >  $(dirname $(dirname $realname))/running/backend
echo Backend container id: $containerid stored at ../running/backend
