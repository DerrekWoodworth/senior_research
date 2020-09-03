## Proto
This project uses [gRPC](https://grpc.io/) to handle communicating over the network. The advantage of gRPC is that it can generate the server and client stubs for us. This folder houses the `.proto` definition files which define the data that is communicated. The build process has been automated. When ever you change the files in the `./proto/proto` directory, run the command below to progagate these changes to the frontend and backend.
```
./generate_code_from_proto.sh

```
