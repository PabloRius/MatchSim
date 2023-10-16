import { Component, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { integer } from "aws-sdk/clients/cloudfront";
import { AwsService } from "src/app/services/aws.service";

@Component({
  selector: "app-view-team",
  templateUrl: "./view-team.component.html",
  styleUrls: ["./view-team.component.css"],
})
export class ViewTeamComponent {
  constructor(
    private route: ActivatedRoute,
    private aws: AwsService,
    private router: Router,
    private html: ElementRef
  ) {}
  parentAlertType: string = "";
  parentContent: string = "";
  players!: [];
  team!: string;
  selectedFormation: string = "3:4:3";
  parsedFormation: number[] = [3, 4, 3];
  formationMap: { [key: string]: number } = {
    fw: 3,
    md: 4,
    df: 3,
    gk: 1,
    bench: 99999,
  };
  imageIdRelation: { [key: string]: any } = {};
  formations = ["3:4:3", "3:3:4", "2:4:4", "2:3:5", "1:4:5", "1:5:4"];
  title!: string;
  ngOnInit() {
    this.team = this.route.snapshot.params["data"];
    console.log(this.team);
    this.aws.get_players_from_team(this.team).subscribe((result) => {
      console.log(result.response);
      this.players = JSON.parse(result.response);
    });
  }

  draggedPlayer!: any;

  dragStart(event: Event, player: string, index: integer) {
    this.imageIdRelation["image-" + index] = player;
    console.log(player);
    this.draggedPlayer = { player, index };
  }

  drop(event: any) {
    if (
      event.target instanceof HTMLDivElement &&
      this.selectedFormation !== "Choose formation"
    ) {
      const elementId: string = event.target.id;
      const elementChildren: number = event.target.children.length;
      if (this.formationMap[elementId] > elementChildren) {
        if (elementId !== "gk") {
          event.preventDefault();

          if (this.draggedPlayer) {
            const index = this.draggedPlayer.index;
            const img = document.getElementById("image-" + index);

            if (img) {
              console.log(event.target instanceof HTMLDivElement);
              if (event.target instanceof HTMLDivElement) {
                event.target.appendChild(img);
                this.resetDraggedImage();
                this.resetDropZone(event);
              }
            }
          }
        } else if (elementId === "gk") {
          console.log(this.draggedPlayer.player[2]);
          if (this.draggedPlayer.player[2] === "Pr") {
            const index = this.draggedPlayer.index;
            const img = document.getElementById("image-" + index);

            if (img) {
              console.log(event.target instanceof HTMLDivElement);
              if (event.target instanceof HTMLDivElement) {
                event.target.appendChild(img);
                this.resetDraggedImage();
                this.resetDropZone(event);
              }
            }
          } else {
            this.resetDraggedImage();
            this.resetDropZone(event);
            this.setAlert("warning", "This player is not a goalkeeper");
          }
        }
      } else {
        this.resetDraggedImage();
        this.resetDropZone(event);
        this.setAlert("warning", "This area is full");
      }
    } else if (this.selectedFormation === "Choose formation") {
      this.resetDraggedImage();
      this.resetDropZone(event);
      this.setAlert("warning", "You have to select a formation first");
    } else {
      this.resetDraggedImage();
      this.resetDropZone(event);
      this.setAlert("warning", "Drop the player in a blank area");
    }
  }

  allowDrop(event: any) {
    if (
      event.target instanceof HTMLDivElement &&
      this.selectedFormation !== "Choose formation"
    ) {
      const elementId: string = event.target.id;
      const elementChildren: number = event.target.children.length;
      if (this.formationMap[elementId] > elementChildren) {
        event.preventDefault();
        event.target.style.border = "2px dashed #000";
      } else {
        event.preventDefault();
        event.target.style.border = "2px dashed red";
      }
    } else if (this.selectedFormation === "Choose formation") {
      event.preventDefault();
      event.target.style.border = "2px dashed red";
    } else {
      event.preventDefault();
      event.target.style.border = "2px dashed red";
    }
  }
  resetDropZone(event: any) {
    event.target.style.border = "none";
  }

  resetDraggedImage() {
    this.draggedPlayer = null;
  }

  setAlert(type: string, content: string) {
    this.parentAlertType = type;
    this.parentContent = content;
    setTimeout(() => {
      // Restablece el valor al valor original después de 4 segundos
      this.parentAlertType = "";
      this.parentContent = "";
    }, 3000);
  }

  parseFormation() {
    if (this.selectedFormation !== "Choose formation") {
      // Divide la cadena en elementos utilizando ":" como separador
      const formationParts = this.selectedFormation.split(":");

      // Convierte los elementos en números y almacénalos en parsedFormation
      this.parsedFormation = formationParts.map((part) => +part);

      this.formationMap = {
        fw: this.parsedFormation[0],
        md: this.parsedFormation[1],
        df: this.parsedFormation[2],
        gk: 1,
        bench: 99999,
      };
    } else {
      // Si se selecciona la opción predeterminada, limpia parsedFormation
      this.parsedFormation = [];
    }
  }

  saveComposition() {
    let fw = this.html.nativeElement.querySelector("#fw");
    let fws = [];
    for (let i = 0; i < fw.children.length; i++) {
      fws.push(this.imageIdRelation[fw.children[i].id][0]);
      console.log(this.imageIdRelation[fw.children[i].id][0]);
    }
    let md = this.html.nativeElement.querySelector("#md");
    let mds = [];
    for (let i = 0; i < md.children.length; i++) {
      mds.push(this.imageIdRelation[md.children[i].id][0]);
      console.log(this.imageIdRelation[md.children[i].id][0]);
    }
    let df = this.html.nativeElement.querySelector("#df");
    let dfs = [];
    for (let i = 0; i < df.children.length; i++) {
      dfs.push(this.imageIdRelation[df.children[i].id][0]);
      console.log(this.imageIdRelation[df.children[i].id][0]);
    }
    let gk = this.html.nativeElement.querySelector("#gk");
    let gks = this.imageIdRelation[gk.children[0].id][0];

    let team = {
      name: this.title,
      formation: this.parsedFormation,
      fws: fws,
      mds: mds,
      dfs: dfs,
      gk: gks,
    };
    console.log(team);
  }
}
