import { Component } from "@angular/core";
import { ColDef, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { Observable, map } from "rxjs";
import { PlayerImageRendererComponent } from "src/app/renderers/player-image-renderer/player-image-renderer.component";
import { ReroutersComponent } from "src/app/renderers/rerouters/rerouters.component";
import { AwsService } from "src/app/services/aws.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.css"],
})
export class PlayersComponent {
  constructor(private aws: AwsService) {}
  ngOnInit() {}
  columnDefs: ColDef[] = [
    { headerName: "Nick", field: "nick" },
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
    {
      headerName: "Teams",
      filter: false,
      sortable: false,
      field: "nick",
      cellRendererSelector: (params: ICellRendererParams<any>) => {
        const teamsDetails = {
          component: ReroutersComponent,
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
    this.rowData$ = this.retrievePlayersList();
  }
}
