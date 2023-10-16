import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-player-image-renderer',
  templateUrl: './player-image-renderer.component.html',
  styleUrls: ['./player-image-renderer.component.css']
})
export class PlayerImageRendererComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;
  img_url!: string;
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
    this.img_url = params.value;
  }

}
