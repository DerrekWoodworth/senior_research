// package: com.derrek.senior
// file: container.proto

var container_pb = require("./container_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CreateService = (function () {
  function CreateService() {}
  CreateService.serviceName = "com.derrek.senior.CreateService";
  return CreateService;
}());

CreateService.Create = {
  methodName: "Create",
  service: CreateService,
  requestStream: false,
  responseStream: false,
  requestType: container_pb.CreateRequest,
  responseType: container_pb.CreateResponse
};

exports.CreateService = CreateService;

function CreateServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CreateServiceClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CreateService.Create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          console.log("ERRORRRRRRRRRRRRRRRRR");
          console.log(err);
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.CreateServiceClient = CreateServiceClient;

