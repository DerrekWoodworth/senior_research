## Senior Research

TPaaS Teach Pentesting as a Service. TPaas is a service for a professors to create Cyber Ranges for their students to learn Cyber Security through offensive methods.

## Dr. Plante
I have dockerized every component. You should be able to run this on your local machine. There is **no** integration with Kubernetes. 

## Running
```
./start_service.sh
```

## Stopping
```
./stop_service.sh
```

### Tasks
- ~~Create Dockerfile to compile the `.proto` to Clojure~~
- ~~Write a build script to compil the `.proto` to Clojure~~
- ~~Create Dockerfile to compile the `.proto` to TypeScript~~
- ~~Write a build script to compil the `.proto` to TypeScript~~
- ~~Write script to generate all codegen~~
- ~~Wrap Backend in docker container~~
- ~~Wrap Frontend in docker container~~
- ~~Add Envoy as docker container~~
- ~~Write launch script to compile and run services~~
- ~~Write stop script~~
- Integrate DB with backend
- Integrate Kubernetes with backend
- Add functionality to add docker containers (frontend and backend)
- Add concept of docker container copies per student
- Add functionality to see if ctf is solved
