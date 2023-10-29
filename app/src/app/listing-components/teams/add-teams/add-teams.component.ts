import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { PlayerImageRendererComponent } from 'src/app/renderers/player-image-renderer/player-image-renderer.component';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.css'],
})
export class AddTeamsComponent {
  nick!: string;
  player_author!: string;
  player_img!: string;
  prev_teams!: [];
  simp_prev_teams: { name: string; author: string; img_url: string }[] = [];
  constructor(
    private route: ActivatedRoute,
    private aws: AwsService,
    private router: Router,
    private myAuth0: MyAuth0Service
  ) {}

  ngOnInit(): void {
    let profile_selector = localStorage.getItem('username');
    if (profile_selector) {
      this.username = profile_selector;
    }
    this.nick = this.route.snapshot.params['player'];
    this.rowData$ = this.retrievePlayersList();
    this.player_author = this.route.snapshot.params['player_author'];
    this.aws.get_player_img(this.nick).subscribe((result) => {
      this.player_img = result['response'];
    });
    this.aws
      .get_teams_from_player(this.nick, this.player_author)
      .subscribe((result) => {
        this.prev_teams = JSON.parse(result['response']);
        console.log(this.prev_teams);
        this.prev_teams.forEach((team: [string, string, string]) => {
          this.simp_prev_teams.push({
            name: team[0],
            author: team[1],
            img_url: team[2],
          });
        });
      });
  }
  username: string = '';
  private gridApi!: GridApi;

  columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      filter: 'agNumberColumnFilter',
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Author',
      field: 'author',
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
    this.gridApi = params.api;

    this.seleccionarFila();
  }
  public rowSelection: 'single' | 'multiple' = 'multiple';

  saveChanges() {
    console.log(this.gridApi.getSelectedRows());
    let teams_list: string[] = [];
    let teams_authors: string[] = [];
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      teams_list.push(this.gridApi.getSelectedRows()[i].name);
      teams_authors.push(this.gridApi.getSelectedRows()[i].author);
    }
    this.aws
      .link_player_to_teams(
        this.nick,
        this.player_author,
        teams_list.toString(),
        teams_authors.toString(),
        this.username
      )
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(['/user-players']);
      });
  }

  seleccionarFila() {
    // Valor que deseas buscar en la columna "nombre"
    let index = 0;
    // Itera a través de las filas de datos
    this.rowData$.forEach((fila: any) => {
      console.log(this.simp_prev_teams);
      fila.forEach(
        (element: { name: string; author: string; img_url: string }) => {
          console.log(this.simp_prev_teams);
          console.log(element);
          this.simp_prev_teams.forEach((simp_prev_team) => {
            if (
              simp_prev_team.name == element.name &&
              simp_prev_team.author == element.author
            ) {
              console.log(this.gridApi.getRenderedNodes());
              this.gridApi.getRenderedNodes().forEach((node) => {
                if (node.rowIndex === index) {
                  console.log(node.rowIndex);
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
