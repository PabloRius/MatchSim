import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bool } from 'aws-sdk/clients/signer';

interface lambda_response {
  statusCode: number;
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  constructor(private http: HttpClient) {}

  lambda_url =
    'https://ncrav2m4wqzmbhdg2vux3maxoy0kxlcz.lambda-url.eu-west-1.on.aws';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  upload_image_to_s3(
    base64_image: string,
    nick: string,
    author: string
  ): Observable<lambda_response> {
    let content = {
      op: 'save_image',
      image: base64_image,
      key: nick + '-' + author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_admin_teams_from_rds() {
    let content = {
      op: 'get_teams',
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_teams_from_rds() {
    let content = {
      op: 'get_public_teams',
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_admin_players_from_rds() {
    let content = {
      op: 'get_players',
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_players_from_rds() {
    let content = {
      op: 'get_public_players',
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }
  get_players_from_user(user: string) {
    let content = {
      op: 'get_players_from_user',
      author: user,
    };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }
  get_teams_from_user(user: string) {
    let content = {
      op: 'get_teams_from_user',
      author: user,
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
    image: string,
    ispublic: string
  ) {
    let content = {
      op: 'save_player',
      nick: nick,
      name: name,
      author: author,
      position: position,
      rank: rank,
      image: image,
      public: ispublic,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  upload_team_to_rds(
    name: string,
    author: string,
    image: string,
    ispublic: string
  ) {
    let content = {
      op: 'save_team',
      name: name,
      author: author,
      image: image,
      public: ispublic,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  link_player_to_teams(
    name: string,
    player_author: string,
    teams: string,
    teams_authors: string,
    author: string
  ) {
    let content = {
      op: 'link_team',
      nick: name,
      player_author: player_author,
      teams: teams,
      teams_authors: teams_authors,
      author: author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  link_team_to_players(
    players: string,
    players_authors: string,
    team: string,
    team_author: string,
    author: string
  ) {
    let content = {
      op: 'link_player',
      nicks: players,
      players_authors: players_authors,
      team: team,
      team_author: team_author,
      author: author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_teams_from_player(name: string, author: string) {
    let content = {
      op: 'get_teams_from_player',
      nick: name,
      author: author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_players_from_team(name: string, author: string) {
    let content = {
      op: 'get_players_from_team',
      name: name,
      author: author,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_player_img(name: string) {
    let content = { op: 'get_player_img', nick: name };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_team_img(name: string, author: string) {
    let content = { op: 'get_team_img', name: name, author: author };
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  save_formation(
    user: string,
    team: string,
    team_author: string,
    formation: {
      name: string;
      formation: number[];
      fws: { [key: string]: any }[];
      mds: { [key: string]: any }[];
      dfs: { [key: string]: any }[];
      gks: { [key: string]: any }[];
    }
  ) {
    let content = {
      op: 'save_formation',
      author: user,
      team: team,
      team_author: team_author,
      formation_name: formation.name,
      formation: formation.formation,
      fws: formation.fws,
      mds: formation.mds,
      dfs: formation.dfs,
      gks: formation.gks,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }

  get_formations_from_user(user: string) {
    let content = {
      op: 'get_formations_from_user',
      user: user,
    };
    console.log(content);
    return this.http.post<lambda_response>(
      this.lambda_url,
      content,
      this.httpOptions
    );
  }
}
