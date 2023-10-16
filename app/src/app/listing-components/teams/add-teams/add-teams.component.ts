import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import { Observable, map } from "rxjs";
import { PlayerImageRendererComponent } from "src/app/renderers/player-image-renderer/player-image-renderer.component";
import { AwsService } from "src/app/services/aws.service";

@Component({
  selector: "app-add-teams",
  templateUrl: "./add-teams.component.html",
  styleUrls: ["./add-teams.component.css"],
})
export class AddTeamsComponent {
  nick!: string;
  player_img!: string;
  prev_teams!: [];
  simp_prev_teams: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private aws: AwsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.nick = this.route.snapshot.params["data"];
    this.aws.get_player_img(this.nick).subscribe((result) => {
      this.player_img = result["response"];
    });
    this.aws.get_teams_from_player(this.nick).subscribe((result) => {
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
      headerName: "Name",
      field: "name",
      filter: "agNumberColumnFilter",
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
    this.gridApi = params.api;
    const rowCount = this.gridApi.getModel().getRowCount();
    let firstRendered = false;

    this.gridApi.addEventListener("firstDataRendered", () => {
      while (this.gridApi.getRenderedNodes().length < rowCount) {}
      this.seleccionarFila();
    });
  }
  public rowSelection: "single" | "multiple" = "multiple";

  saveChanges() {
    console.log(this.gridApi.getSelectedRows());
    let teams_list: string[] = [];
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      teams_list.push(this.gridApi.getSelectedRows()[i].name);
    }
    this.aws
      .link_player_to_teams(this.nick, teams_list.toString())
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(["/players"]);
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
          if (this.simp_prev_teams.includes(element.name)) {
            console.log(this.gridApi.getRenderedNodes());
            this.gridApi.getRenderedNodes().forEach((node) => {
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
