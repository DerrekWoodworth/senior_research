#!/bin/bash


# Set up the ~pid~ files
mkdir -p ./running

# Generate the proto code
./proto/generate_code_from_proto.sh


./backend/run_backend.sh
./frontend/run_frontend.sh
./envoy/run_envoy.sh

echo Started the frontend, backend, and proxy

echo The services take a some time to boot, watch the logs until angular comes up
echo Run this command until you see -- Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ 
echo docker logs -f $(cat $(dirname $0)/running/frontend)



