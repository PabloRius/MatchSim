import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { AwsService } from "src/app/services/aws.service";
@Component({
  selector: "app-rerouter-players",
  templateUrl: "./rerouter-players.component.html",
  styleUrls: ["./rerouter-players.component.css"],
})
export class RerouterPlayersComponent implements ICellRendererAngularComp {
  constructor(private aws: AwsService, private router: Router) {}
  private params!: ICellRendererParams;
  players: string[] = [];
  name!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.setImg(params);
    this.aws.get_players_from_team(this.name).subscribe((result) => {
      JSON.parse(result.response).forEach((each: [string, string]) => {
        this.players.push(each[1]);
      });
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
    this.router.navigate(["/add-players", this.name]);
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
