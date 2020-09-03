// package: com.derrek.senior
// file: container.proto

import * as container_pb from "./container_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CreateServiceCreate = {
  readonly methodName: string;
  readonly service: typeof CreateService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof container_pb.CreateRequest;
  readonly responseType: typeof container_pb.CreateResponse;
};

export class CreateService {
  static readonly serviceName: string;
  static readonly Create: CreateServiceCreate;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class CreateServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  create(
    requestMessage: container_pb.CreateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: container_pb.CreateResponse|null) => void
  ): UnaryResponse;
  create(
    requestMessage: container_pb.CreateRequest,
    callback: (error: ServiceError|null, responseMessage: container_pb.CreateResponse|null) => void
  ): UnaryResponse;
}

