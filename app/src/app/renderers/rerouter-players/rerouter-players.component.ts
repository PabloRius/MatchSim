import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AwsService } from 'src/app/services/aws.service';
@Component({
  selector: 'app-rerouter-players',
  templateUrl: './rerouter-players.component.html',
  styleUrls: ['./rerouter-players.component.css'],
})
export class RerouterPlayersComponent implements ICellRendererAngularComp {
  constructor(private aws: AwsService, private router: Router) {}
  private params!: ICellRendererParams;
  players_icons: string[] = [];
  name!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.setImg(params);
    this.aws
      .get_players_from_team(this.name, params.data.author)
      .subscribe((result) => {
        JSON.parse(result.response).forEach(
          (each: [string, string, string, string, string, string]) => {
            this.players_icons.push(each[3]);
          }
        );
      });
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.setImg(params);
    return true;
  }
  private setImg(params: ICellRendererParams) {
    this.name = params.value;
  }

  addTeams() {
    const author = this.params.data.author;
    this.router.navigate(['/add-players', author, this.name]);
  }

  public scrollOffset = 0;

  scrollLeft() {
    this.scrollOffset -= 50; // Ajusta el valor según sea necesario
  }

  scrollRight() {
    this.scrollOffset += 50; // Ajusta el valor según sea necesario
    if (this.scrollOffset > 0) {
      this.scrollOffset = 0;
    }
  }
}
