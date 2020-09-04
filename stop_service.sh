#!/bin/bash
pids=()

dir=$(dirname $0)

echo Stopping service

for f in $dir/running/*; do
    docker stop $(cat $f) >/dev/null & >/dev/null
    pids+=( "$!" )
done
echo $pids

for pid in ${pids[@]}; do
    echo Stopping pid $pid
    wait $pid
done

echo Stopped service
