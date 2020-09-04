#!/bin/bash


# Set up the ~pid~ files
mkdir -p ./running


./backend/run_backend.sh
./frontend/run_frontend.sh
./envoy/run_envoy.sh

echo Reach the UI at http://localhost:4200

echo Started the frontend, backend, and proxy

