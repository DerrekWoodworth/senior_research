#!/bin/bash
pids=()

dir=$(dirname $0)


for f in $dir/running/*; do
    docker stop $(cat $f) &
    pids+=( "$!" )
done

for pid in ${pids[@]}; do
    echo Stopping pid $pid
    wait $pid
done

echo Stopped all containers
