import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "app-team-view-renderer",
  templateUrl: "./team-view-renderer.component.html",
  styleUrls: ["./team-view-renderer.component.css"],
})
export class TeamViewRendererComponent implements ICellRendererAngularComp {
  constructor(private router: Router) {}
  private params!: ICellRendererParams;
  public team!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.setTeam(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.setTeam(params);
    return true;
  }
  private setTeam(params: ICellRendererParams) {
    this.team = params.value;
  }
  viewTeamDisplay() {
    console.log(this.team);
    this.router.navigate(["/view-team", this.team]);
  }
}
