#!/bin/bash

echo Starting frontend...
realname=$(realpath $0)
containerid=$(docker run -d --rm -p 4200:4200 -v $(dirname $realname):/root/frontend node /bin/bash -c "cd /root/frontend; npm install -g @angular/cli; ng serve --host 0.0.0.0 --prod")

# Write the container id to a file (essentially a pid file)
echo $containerid > $(dirname $(dirname $realname))/running/frontend
echo Frontend container id: $containerid stored at ../running/frontend
