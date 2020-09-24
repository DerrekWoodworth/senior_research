import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './authinterceptor';
import { FileClient } from './generated/FileServiceClientPb';
import { Chunk } from './generated/file_pb';
import { from, Observable } from 'rxjs';

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
    chunk.setFilename("base64_name")
    const ab = from(file.arrayBuffer())
    ab.subscribe((arrayBuffer) => {
      chunk.setContent(new Uint8Array(arrayBuffer))
      console.log("About to send file")

      new Observable((observer) => {
        this.client.upload(chunk, null, (err, res) => {
          if (err) {
            observer.next(err)
          } else {
            observer.next(res.getMessage())
          }
        })
      }).subscribe((value) => {
        console.log(value)
      })
    })


  }
}
