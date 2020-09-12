export class AuthInterceptor {

  constructor() {
  }

  intercept(request: any, invoker: any) {
    const metadata = request.getMetadata()
    const jwt = localStorage.getItem('jwt')
    metadata.Authorization = 'Bearer ' + jwt
    console.log("Added authorization to request")
    return invoker(request)
  }
}
