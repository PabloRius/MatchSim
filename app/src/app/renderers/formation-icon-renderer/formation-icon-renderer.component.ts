import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-formation-icon-renderer',
  templateUrl: './formation-icon-renderer.component.html',
  styleUrls: ['./formation-icon-renderer.component.css'],
})
export class FormationIconRendererComponent
  implements ICellRendererAngularComp
{
  constructor(private aws: AwsService, private router: Router) {}
  private params!: ICellRendererParams;
  team!: string;
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
    this.team = params.value;
  }

  redirectFormations() {
    const author = this.params.data.author;
    console.log(author);
    this.router.navigate(['/view-team', author, this.team]);
  }
}
