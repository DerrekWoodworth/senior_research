## Proto
This project uses [gRPC](https://grpc.io/) to handle communicating over the network. Modern Infrastructure is comprised of microservices that communicate over the network. The advantage gRPC has over a rest API is that it generates all of the networking code. So as a developer you just consume the API it creates, instead of having to write an API, then code on the server and client to handle communication  
This folder houses the `.proto` files which define the data that is sent between the frontend and backend. There is a script to automatically create the server and client code to use in development. When you add/modify/delete a `.proto` file you need to regenerate the code.
```
