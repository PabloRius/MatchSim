import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface lambda_response {
  statusCode: number,
  response: string
}

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private http: HttpClient) { }

  lambda_url = "https://ncrav2m4wqzmbhdg2vux3maxoy0kxlcz.lambda-url.eu-west-1.on.aws";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  upload_image_to_s3(base64_image:string): Observable<lambda_response>{
    let content = {
        "op": "save_image",
        "image": base64_image,
        "key": "test1"
    }
    console.log(content)
    return this.http.post<lambda_response>(this.lambda_url, content, this.httpOptions)
  }
  get_players_from_rds(){
    let content = {
      "op": "get_players"
    }
    return this.http.post<lambda_response>(this.lambda_url, content, this.httpOptions)
  }
  upload_player_to_rds(name:string, author:string, position:string, rank:string, image:string){
    let content = {
      "op": "save_player",
      "name": name,
      "author": author,
      "position": position,
      "rank": rank,
      "image": image
    }
    console.log(content)
    return this.http.post<lambda_response>(this.lambda_url, content, this.httpOptions)
  }
}
