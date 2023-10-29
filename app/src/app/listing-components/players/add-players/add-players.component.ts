import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import { Observable, first, map } from 'rxjs';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css'],
})
export class AddPlayersComponent {
  team!: string;
  team_author!: string;
  team_img!: string;
  prev_teams!: [];
  simp_prev_teams: {
    nick: string[0];
    author: string;
    name: string;
    img_url: string;
    position: string;
    rank: string;
  }[] = [];
  username: string = '';
  constructor(
    private route: ActivatedRoute,
    private aws: AwsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let profile_selector = localStorage.getItem('username');
    if (profile_selector) {
      this.username = profile_selector;
    }
    this.team = this.route.snapshot.params['team'];
    this.rowData$ = this.retrievePlayers();
    this.team_author = this.route.snapshot.params['team_author'];
    this.aws.get_team_img(this.team, this.team_author).subscribe((result) => {
      this.team_img = result['response'];
    });
    this.aws
      .get_players_from_team(this.team, this.team_author)
      .subscribe((result) => {
        this.prev_teams = JSON.parse(result['response']);
        console.log(this.prev_teams);
        this.prev_teams.forEach(
          (team: [string, string, string, string, string, string]) => {
            this.simp_prev_teams.push({
              nick: team[0],
              author: team[1],
              name: team[2],
              img_url: team[3],
              position: team[4],
              rank: team[5],
            });
          }
        );
      });
  }
  private gridApi!: GridApi;

  columnDefs: ColDef[] = [
    {
      headerName: 'Nick',
      field: 'nick',
      headerCheckboxSelection: true,
      checkboxSelection: true,
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
    { headerName: 'Name', field: 'name' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Rank', field: 'rank' },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    sortable: true,
    floatingFilter: true,
  };

  retrievePlayers(): Observable<any[]> {
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

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.selectRows();
  }
  public rowSelection: 'single' | 'multiple' = 'multiple';

  saveChanges() {
    let players_list: string[] = [];
    let players_authors: string[] = [];
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      players_list.push(this.gridApi.getSelectedRows()[i].nick);
      players_authors.push(this.gridApi.getSelectedRows()[i].author);
    }
    this.aws
      .link_team_to_players(
        players_list.toString(),
        players_authors.toString(),
        this.team,
        this.team_author,
        this.username
      )
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(['/user-teams']);
      });
  }

  selectRows() {
    // Valor que deseas buscar en la columna "nombre"
    let index = 0;
    // Itera a través de las filas de datos
    this.rowData$.forEach((fila: any) => {
      console.log(this.simp_prev_teams);
      fila.forEach(
        (element: {
          nick: string;
          name: string;
          author: string;
          position: string;
          ranked: string;
          img_url: string;
        }) => {
          console.log(this.simp_prev_teams);
          this.simp_prev_teams.forEach((simp_prev_team) => {
            if (
              simp_prev_team.nick == element.nick &&
              simp_prev_team.author == element.author
            ) {
              this.gridApi.forEachNodeAfterFilterAndSort((node) => {
                if (node.rowIndex === index) {
                  node.setSelected(true);
                }
              });
            }
          });
          index++;
        }
      );
    });
  }
}
