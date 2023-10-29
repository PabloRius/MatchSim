import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface lambda_response {
  statusCode: number;
  response: string;
}
@Injectable({
  providedIn: 'root',
})
export class MatchSimulatorService {
  constructor(private http: HttpClient) {}

  token_generation_lambda_url =
    'https://2ulcagpghov2jdjc64fw6xsdre0xfyzb.lambda-url.eu-west-1.on.aws';

  match_initializer_url =
    'https://nwks4wjpjodp2umhkyxq3ca7e40avduf.lambda-url.eu-west-1.on.aws/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get_match_data(user: string): Observable<lambda_response> {
    let content = {
      user: user,
    };
    return this.http.post<lambda_response>(
      this.token_generation_lambda_url,
      content,
      this.httpOptions
    );
  }

  start_match(
    username: string,
    home: string,
    visitor: string,
    formation_home_author: string,
    team_home: string,
    team_home_author: string,
    formation_visitor_author: string,
    team_visitor: string,
    team_visitor_author: string
  ) {
    let content = {
      username: username,
      formation_home: home,
      formation_home_author: formation_home_author,
      formation_visitor: visitor,
      formation_visitor_author: formation_visitor_author,
      team_home: team_home,
      team_home_author: team_home_author,
      team_visitor: team_visitor,
      team_visitor_author: team_visitor_author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.match_initializer_url,
      content,
      this.httpOptions
    );
  }
}
