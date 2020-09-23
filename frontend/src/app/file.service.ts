import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './authinterceptor';
import { FileClient } from './generated/FileServiceClientPb';
import { Chunk } from './generated/file_pb';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private client: FileClient

  constructor() {
    const authInterceptor = new AuthInterceptor()
    let options = {

      unaryInterceptors: [authInterceptor],
      streamInterceptors: [authInterceptor]
    }
    
    this.client = new FileClient(environment.url, null, options)
   }

   uploadFile(file: File) {
     // Chunk file and send it, will need to happen multiple times
     const chunk = new Chunk()
     chunk.setName("base64_name")
     chunk.setContent(new Uint8Array())

     this.client.upload(chunk, null, (err, res) => {
       console.log(err)
       console.log(res)
     })
   }
}
