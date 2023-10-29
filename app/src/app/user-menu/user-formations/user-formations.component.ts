import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { FormationTeamShowComponent } from 'src/app/renderers/formation-team-show/formation-team-show.component';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { ReroutersComponent } from 'src/app/renderers/rerouters/rerouters.component';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-user-formations',
  templateUrl: './user-formations.component.html',
  styleUrls: ['./user-formations.component.css'],
})
export class UserFormationsComponent {
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
    { headerName: 'Name', field: 'name' },
    { headerName: 'Author', field: 'author' },
    {
      headerName: 'Original Team',
      filter: false,
      sortable: false,
      field: 'team',
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const imageDetails = {
          component: FormationTeamShowComponent,
        };
        return imageDetails;
      },
    },
    { headerName: 'Formation', field: 'formation' },
    { headerName: 'Wins', field: 'wins' },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    sortable: true,
    floatingFilter: true,
  };

  retrieveFormationsList(): Observable<any[]> {
    // Realiza la solicitud HTTP y transforma los datos usando map
    return this.aws.get_formations_from_user(this.username).pipe(
      map((result: any) => {
        console.log(result);
        let loaded: any[] = [];

        let parsed_result: [
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        ][] = JSON.parse(result.response);

        parsed_result.forEach(
          (element: [any, any, any, any, any, any, any, any, any, any]) => {
            let curr_el = {
              team: element[0],
              team_author: element[1],
              author: element[2],
              name: element[3],
              formation: element[4],
              wins: element[9],
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
    this.rowData$ = this.retrieveFormationsList();
  }
}
