import { Component, numberAttribute } from '@angular/core';

import { AwsService } from 'src/app/services/aws.service'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  
  constructor(private aws: AwsService){
  }
  ngOnInit(){
    this.retrievePlayersList()
  }

  filteredPlayers:{"id": number, "name": string, "author": string, "position": string, "rank": string, "img_url": string}[] = []


  retrievePlayersList(){
    this.aws.get_players_from_rds().subscribe((result) => { 
      console.log(result)
      let parsed_result: [any, any, any, any, any, any, any][] = JSON.parse(result.response)
      console.log(parsed_result) 
      parsed_result.forEach((element:[any, any, any, any, any, any, any]) => {
        let curr_el = {
          "id": element[0],
          "name": element[1],
          "author": element[2],
          "position": element[3],
          "rank": element[4],
          "img_url": element[5]
        }
        this.filteredPlayers.push(curr_el)
      });
      console.log(this.filteredPlayers)
    })
  } 
}
