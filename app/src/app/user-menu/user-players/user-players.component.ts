import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { ReroutersComponent } from 'src/app/renderers/rerouters/rerouters.component';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-user-players',
  templateUrl: './user-players.component.html',
  styleUrls: ['./user-players.component.css'],
})
export class UserPlayersComponent {
  constructor(
    private aws: AwsService,
    public auth0: AuthService,
    private myAuth0: MyAuth0Service
  ) {}

  ngOnInit() {
    let profile_selector = localStorage.getItem('username');
    if (profile_selector) {
      this.username = profile_selector;
    }
  }

  username: string = '';

  columnDefs: ColDef[] = [
    { headerName: 'Nick', field: 'nick' },
    {
      headerName: 'Image',
      filter: false,
      sortable: false,
      field: 'img_url',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const imageDetails = {
          component: PlayerImageRendererComponent,
        };
        return imageDetails;
      },
    },
    { headerName: 'Author', field: 'author' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Rank', field: 'rank' },
    {
      headerName: 'Teams',
      filter: false,
      sortable: false,
      field: 'nick',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const teamsDetails = {
          component: ReroutersComponent,
          params: {
            nick: params.data.nick,
            author: params.data.author,
          },
        };
        console.log(params);
        return teamsDetails;
      },
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
    return this.aws.get_players_from_user(this.username).pipe(
      map((result: any) => {
        let loaded: any[] = [];

        let parsed_result: [any, any, any, any, any, any, any][] = JSON.parse(
          result.response
        );

        parsed_result.forEach(
          (element: [any, any, any, any, any, any, any]) => {
            let curr_el = {
              nick: element[0],
              name: element[1],
              author: element[2],
              position: element[3],
              rank: element[4],
              img_url: element[5],
            };
            loaded.push(curr_el);
          }
        );

        return loaded;
      })
    );
  }

  public rowData$!: Observable<any[]>;

  async onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.retrievePlayersList();
  }
}
