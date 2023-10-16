import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import { Observable, first, map } from "rxjs";
import { PlayerImageRendererComponent } from "src/app/renderers/player-image-renderer/player-image-renderer.component";
import { AwsService } from "src/app/services/aws.service";

@Component({
  selector: "app-add-players",
  templateUrl: "./add-players.component.html",
  styleUrls: ["./add-players.component.css"],
})
export class AddPlayersComponent {
  team!: string;
  team_img!: string;
  prev_teams!: [];
  simp_prev_teams: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private aws: AwsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.team = this.route.snapshot.params["data"];
    this.rowData$ = this.retrievePlayers();
    this.aws.get_team_img(this.team).subscribe((result) => {
      this.team_img = result["response"];
    });
    this.aws.get_players_from_team(this.team).subscribe((result) => {
      this.prev_teams = JSON.parse(result["response"]);
      console.log(this.prev_teams);
      this.prev_teams.forEach((team: [string, string, string]) => {
        this.simp_prev_teams.push(team[0]);
      });
    });
  }
  private gridApi!: GridApi;

  columnDefs: ColDef[] = [
    {
      headerName: "Nick",
      field: "nick",
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      headerName: "Image",
      filter: false,
      sortable: false,
      field: "img_url",
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const imageDetails = {
          component: PlayerImageRendererComponent,
        };
        return imageDetails;
      },
    },
    { headerName: "Name", field: "name" },
    { headerName: "Position", field: "position" },
    { headerName: "Rank", field: "rank" },
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
    return this.aws.get_players_from_rds().pipe(
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
  public rowSelection: "single" | "multiple" = "multiple";

  saveChanges() {
    console.log(this.gridApi.getSelectedRows());
    let players_list: string[] = [];
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      players_list.push(this.gridApi.getSelectedRows()[i].nick);
    }
    this.aws
      .link_team_to_players(players_list.toString(), this.team)
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(["/teams"]);
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
          if (this.simp_prev_teams.includes(element.nick)) {
            console.log("COINSIDE");
            this.gridApi.forEachNodeAfterFilterAndSort((node) => {
              console.log(node.rowIndex);
              if (node.rowIndex === index) {
                console.log(node.rowIndex);
                node.setSelected(true);
              }
            });
          }
          index++;
        }
      );
    });
  }
}
