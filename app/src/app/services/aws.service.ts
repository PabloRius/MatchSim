import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

interface lambda_response {
  statusCode: number;
  response: string;
}

@Injectable({
  providedIn: "root",
})
export class AwsService {
  constructor(private http: HttpClient) {}

  lambda_url =
    "https://ncrav2m4wqzmbhdg2vux3maxoy0kxlcz.lambda-url.eu-west-1.on.aws";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  upload_image_to_s3(base64_image: string): Observable<lambda_response> {
    let content = {
      op: "save_image",
      image: base64_image,
      key: "test1",
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_teams_from_rds() {
    let content = {
      op: "get_teams",
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_players_from_rds() {
    let content = {
      op: "get_players",
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }
  upload_player_to_rds(
    nick: string,
    name: string,
    author: string,
    position: string,
    rank: string,
    image: string
  ) {
    let content = {
      op: "save_player",
      nick: nick,
      name: name,
      author: author,
      position: position,
      rank: rank,
      image: image,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  upload_team_to_rds(name: string, author: string, image: string) {
    let content = {
      op: "save_team",
      name: name,
      author: author,
      image: image,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  link_player_to_teams(name: string, teams: string) {
    let content = {
      op: "link_team",
      nick: name,
      teams: teams,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  link_team_to_players(names: string, team: string) {
    let content = {
      op: "link_player",
      nicks: names,
      team: team,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_teams_from_player(name: string) {
    let content = {
      op: "get_teams_from_player",
      nick: name,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_players_from_team(name: string) {
    let content = {
      op: "get_players_from_team",
      name: name,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_player_img(name: string) {
    let content = { op: "get_player_img", nick: name };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_team_img(name: string) {
    let content = { op: "get_team_img", name: name };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }
}
