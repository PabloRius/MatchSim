import { Component } from '@angular/core';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  constructor(private aws: AwsService) {}
  ngOnInit() {}

  columnDefs: ColDef[] = [
    {
      headerName: 'Image',
      filter: false,
      maxWidth: 80,
      sortable: false,
      field: 'img_url',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const imageDetails = {
          component: PlayerImageRendererComponent,
        };
        return imageDetails;
      },
    },
    {
      headerName: 'Name',
      field: 'name',
    },
    {
      headerName: 'Author',
      field: 'author',
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    sortable: true,
    floatingFilter: true,
  };

  retrievePlayersList(): Observable<any[]> {
    // Realiza la solicitud HTTP y transforma los datos usando map
    return this.aws.get_teams_from_rds().pipe(
      map((result: any) => {
        let loaded: any[] = [];

        let parsed_result: [any, any, any][] = JSON.parse(result.response);

        parsed_result.forEach((element: [any, any, any]) => {
          let curr_el = {
            name: element[0],
            author: element[1],
            img_url: element[2],
          };
          loaded.push(curr_el);
        });

        return loaded;
      })
    );
  }

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.retrievePlayersList();
  }
}
