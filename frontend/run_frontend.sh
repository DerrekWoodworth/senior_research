#!/bin/bash

realname=$(realpath $0)
docker run --rm -p 4200:4200 -v $(dirname $realname):/root/frontend node /bin/bash -c "cd /root/frontend; npm install -g @angular/cli; ng serve --host 0.0.0.0" &
