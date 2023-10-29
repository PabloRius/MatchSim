import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-formation-team-show',
  templateUrl: './formation-team-show.component.html',
  styleUrls: ['./formation-team-show.component.css'],
})
export class FormationTeamShowComponent implements ICellRendererAngularComp {
  constructor(private aws: AwsService, private router: Router) {}
  private params!: ICellRendererParams;
  team!: string;
  author!: string;
  img_src!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.setImg(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.setImg(params);
    return true;
  }
  private setImg(params: ICellRendererParams) {
    this.author = this.params.data.author;

    this.team = params.value;

    this.aws.get_team_img(this.team, this.author).subscribe((result) => {
      this.img_src = result.response;
    });
  }
}
