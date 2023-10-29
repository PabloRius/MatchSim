import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-rerouters',
  templateUrl: './rerouters.component.html',
  styleUrls: ['./rerouters.component.css'],
})
export class ReroutersComponent implements ICellRendererAngularComp {
  constructor(
    private aws: AwsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  private params!: ICellRendererParams;
  teams_icons: string[] = [];
  nick!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.setImg(params);
    this.aws
      .get_teams_from_player(this.nick, params.data.author)
      .subscribe((result) => {
        console.log(result);
        JSON.parse(result.response).forEach(
          (each: [string, string, string]) => {
            this.teams_icons.push(each[2]);
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
    this.nick = params.value;
  }

  addTeams() {
    const author = this.params.data.author;
    console.log(author);
    this.router.navigate(['/add-teams', author, this.nick]);
  }
}
