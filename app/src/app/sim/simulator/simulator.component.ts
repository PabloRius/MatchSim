import { Component } from '@angular/core';
import { Subject, interval, takeUntil, takeWhile } from 'rxjs';
import { AwsService } from 'src/app/services/aws.service';
import { MatchSimulatorService } from 'src/app/services/matchSimulator.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  constructor(private sim: MatchSimulatorService, private aws: AwsService) {}
  matchInProgress = false;
  matchOver = false;
  username!: string;
  simp_formations: parsed_formation[] = [];
  home_team!: parsed_formation;
  visitor_team!: parsed_formation;
  match_info!: parsed_match_info;

  time: string = '00:00';
  home_team_name: string = '';
  visitor_team_name: string = '';
  home_team_img!: string;
  visitor_team_img!: string;
  home_team_goalers: string[] = [];
  visitor_team_goalers: string[] = [];
  last_info: string[] = [];
  posession_player: string = '';
  posession_team: string = '';

  ngOnInit() {
    let profile_selector = localStorage.getItem('username');
    if (profile_selector) {
      this.username = profile_selector;
    }
    this.parseUserFormations();
    this.retrieveMatchData();
  }

  parseUserFormations() {
    this.aws.get_formations_from_user(this.username).subscribe((result) => {
      JSON.parse(result.response).forEach(
        (
          formation: [
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            string,
            number
          ]
        ) => {
          this.simp_formations.push({
            team: formation[0],
            team_author: formation[1],
            author: formation[2],
            name: formation[3],
            formation: JSON.parse(formation[4]),
            fws: JSON.parse(formation[5]),
            mds: JSON.parse(formation[6]),
            dfs: JSON.parse(formation[7]),
            gks: JSON.parse(formation[8]),
            wins: formation[9],
          });
        }
      );
    });
  }

  parseForSimulator() {
    let home_keeper_parsed: simulator_player_parsed = {
      name: this.home_team.gks[0].nick,
      position: 'portero',
      rank: this.home_team.gks[0].rank,
    };
    let home_players_parsed: simulator_player_parsed[] = [];
    this.home_team.fws.forEach((forward) => {
      home_players_parsed.push({
        name: forward.nick,
        position: 'delantero',
        rank: forward.rank,
      });
    });
    this.home_team.mds.forEach((midfielder) => {
      home_players_parsed.push({
        name: midfielder.nick,
        position: 'medio',
        rank: midfielder.rank,
      });
    });
    this.home_team.dfs.forEach((defender) => {
      home_players_parsed.push({
        name: defender.nick,
        position: 'defensa',
        rank: defender.rank,
      });
    });
    let home_team_parsed: simulator_parse = {
      name: this.home_team.name,
      keeper: home_keeper_parsed,
      players: home_players_parsed,
      goals: 0,
    };

    let visitor_keeper_parsed: simulator_player_parsed = {
      name: this.visitor_team.gks[0].nick,
      position: 'portero',
      rank: this.visitor_team.gks[0].rank,
    };
    let visitor_players_parsed: simulator_player_parsed[] = [];
    this.visitor_team.fws.forEach((forward) => {
      visitor_players_parsed.push({
        name: forward.nick,
        position: 'delantero',
        rank: forward.rank,
      });
    });
    this.visitor_team.mds.forEach((midfielder) => {
      visitor_players_parsed.push({
        name: midfielder.nick,
        position: 'medio',
        rank: midfielder.rank,
      });
    });
    this.visitor_team.dfs.forEach((defender) => {
      visitor_players_parsed.push({
        name: defender.nick,
        position: 'defensa',
        rank: defender.rank,
      });
    });
    let visitor_team_parsed: simulator_parse = {
      name: this.visitor_team.name,
      keeper: visitor_keeper_parsed,
      players: visitor_players_parsed,
      goals: 0,
    };

    return {
      home_parsed: home_team_parsed,
      visitor_parsed: visitor_team_parsed,
    };
  }

  no_interval = true;

  parseMatchInfo(
    data: [
      string,
      string,
      string,
      string,
      number,
      string,
      string,
      string,
      string,
      string,
      number,
      string,
      string,
      string,
      string,
      boolean,
      string
    ]
  ) {
    let parsed_info: parsed_match_info = {
      formation_home: data[0],
      formation_home_author: data[1],
      team_home: data[2],
      team_home_author: data[3],
      goals_home: data[4],
      goalers_home: data[5],
      formation_visitor: data[6],
      formation_visitor_author: data[7],
      team_visitor: data[8],
      team_visitor_author: data[9],
      goals_visitor: data[10],
      goalers_visitor: data[11],
      last_info: data[12].replace(/^"|"$/g, '').replace(/"([^"]+)"/g, '$1'),
      posession_team: data[13],
      posession_player: data[14],
      match_over: data[15],
      time: data[16],
    };
    this.match_info = parsed_info;
    this.reloadScoreboard();
    if (parsed_info.match_over == true) {
      console.log('The current match is over');
      this.matchOver = true;
    } else {
      if (this.no_interval) {
        this.no_interval = false;
        interval(2500)
          .pipe(
            takeUntil(this.destroy$),
            takeWhile(() => !this.match_info.match_over, true)
          )
          .subscribe(() => {
            this.retrieveMatchData();
          });
      }
    }
  }

  reloadScoreboard() {
    this.time = this.match_info.time;
    if (this.match_info.team_home != this.home_team_name) {
      this.home_team_name = this.match_info.team_home;
    }
    if (this.match_info.team_visitor != this.visitor_team_name) {
      this.visitor_team_name = this.match_info.team_visitor;
    }
    this.aws
      .get_team_img(this.home_team_name, this.match_info.team_home_author)
      .subscribe((result) => {
        if (result.response != this.home_team_img) {
          this.home_team_img = result.response;
        }
      });
    this.aws
      .get_team_img(this.visitor_team_name, this.match_info.team_visitor_author)
      .subscribe((result) => {
        if (result.response != this.visitor_team_img) {
          this.visitor_team_img = result.response;
        }
      });
    this.home_team_goalers = JSON.parse(this.match_info.goalers_home);
    this.visitor_team_goalers = JSON.parse(this.match_info.goalers_visitor);
    if (this.match_info.last_info !== this.last_info.at(-1)) {
      console.log(this.last_info.at(-1));
      if (this.last_info.length >= 5) {
        this.last_info.push(this.match_info.last_info);
        this.last_info = this.last_info.slice(-5, -1);
      } else {
        this.last_info.push(this.match_info.last_info);
      }
    }
    this.posession_player = this.match_info.posession_player;
    this.posession_team = this.match_info.posession_team;
  }

  changeFormation(side: string, formation: parsed_formation) {
    console.log('Ay');
    if (side == 'home') {
      this.home_team = formation;
    } else if (side == 'visitor') {
      this.visitor_team = formation;
    }
  }

  retrieveMatchData() {
    this.sim.get_match_data(this.username).subscribe((result) => {
      if (JSON.parse(result.response).length == 0) {
        console.log('No match record found');
        this.matchInProgress = false;
      } else {
        this.matchInProgress = true;
        this.parseMatchInfo(JSON.parse(result.response)[0]);
      }
    });
  }

  private destroy$ = new Subject<void>();
  startMatch() {
    if (this.home_team && this.visitor_team) {
      let parsed_all = this.parseForSimulator();
      this.match_info.match_over = false;
      this.no_interval = false;
      interval(2500)
        .pipe(
          takeUntil(this.destroy$),
          takeWhile(() => !this.match_info.match_over, true)
        )
        .subscribe(() => {
          this.retrieveMatchData();
        });
      this.sim
        .start_match(
          this.username,
          JSON.stringify(parsed_all.home_parsed),
          JSON.stringify(parsed_all.visitor_parsed),
          this.home_team.author,
          this.home_team.team,
          this.home_team.team_author,
          this.visitor_team.author,
          this.visitor_team.team,
          this.visitor_team.team_author
        )
        .subscribe((result) => {
          console.log(result);
          this.retrieveMatchData();
        });
    } else {
      console.log('Set both teams');
    }
  }

  restartMatch() {
    this.matchInProgress = false;
    this.matchOver = false;
  }
}

interface parsed_formation_player {
  nick: string;
  author: string;
  name: string;
  img_url: string;
  position: string;
  rank: 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
}

interface parsed_formation {
  team: string;
  team_author: string;
  author: string;
  name: string;
  formation: number[];
  fws: parsed_formation_player[];
  mds: parsed_formation_player[];
  dfs: parsed_formation_player[];
  gks: parsed_formation_player[];
  wins: number;
}

interface parsed_match_info {
  formation_home: string;
  formation_home_author: string;
  team_home: string;
  team_home_author: string;
  goals_home: number;
  goalers_home: string;
  formation_visitor: string;
  formation_visitor_author: string;
  team_visitor: string;
  team_visitor_author: string;
  goals_visitor: number;
  goalers_visitor: string;
  last_info: string;
  posession_team: string;
  posession_player: string;
  match_over: boolean;
  time: string;
}

interface simulator_parse {
  name: string;
  keeper: simulator_player_parsed;
  players: simulator_player_parsed[];
  goals: number;
}

interface simulator_player_parsed {
  name: string;
  position: 'delantero' | 'medio' | 'defensa' | 'portero';
  rank: 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';
}
