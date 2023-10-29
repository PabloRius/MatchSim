import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { FormationIconRendererComponent } from 'src/app/renderers/formation-icon-renderer/formation-icon-renderer.component';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { RerouterPlayersComponent } from 'src/app/renderers/rerouter-players/rerouter-players.component';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.css'],
})
export class UserTeamsComponent {
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
    {
      headerName: 'Name',
      field: 'name',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const teamsDetails = {
          component: FormationIconRendererComponent,
        };
        return teamsDetails;
      },
    },
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
    {
      headerName: 'Author',
      field: 'author',
    },
    {
      headerName: 'Players',
      filter: false,
      sortable: false,
      field: 'name',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const teamsDetails = {
          component: RerouterPlayersComponent,
        };
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
    return this.aws.get_teams_from_user(this.username).pipe(
      map((result: any) => {
        console.log(result);
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

  async onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.retrievePlayersList();
  }
}
