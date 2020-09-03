#!/bin/bash

realname=$(realpath $0)
docker run --rm -p 8080:8080 -v $(dirname $realname):/root/backend clojure:lein /bin/bash -c "cd /root/backend; lein run" &
