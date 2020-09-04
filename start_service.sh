#!/bin/bash


# Set up the ~pid~ files
mkdir -p ./running

echo Starting the frontend, backend, and proxy

./backend/run_backend.sh
./frontend/run_frontend.sh
exit
./run_envoy


echo Started the frontend, backend, and proxy
