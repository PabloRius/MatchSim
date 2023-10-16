import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./main-components/header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PlayersComponent } from "./listing-components/players/players.component";
import { TeamsComponent } from "./listing-components/teams/teams.component";
import { SimulatorComponent } from "./sim/simulator/simulator.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CreatePlayerComponent } from "./listing-components/players/create-player/create-player.component";
import { AgGridModule } from "ag-grid-angular";
import { GridExampleComponent } from "./listing-components/players/grid-example/grid-example.component";
import { PlayerImageRendererComponent } from "./renderers/player-image-renderer/player-image-renderer.component";
import { CreateTeamComponent } from "./listing-components/teams/create-team/create-team.component";
import { ReroutersComponent } from "./renderers/rerouters/rerouters.component";
import { AddTeamsComponent } from "./listing-components/teams/add-teams/add-teams.component";
import { AddPlayersComponent } from "./listing-components/players/add-players/add-players.component";
import { RerouterPlayersComponent } from "./renderers/rerouter-players/rerouter-players.component";
import { ViewTeamComponent } from "./listing-components/teams/view-team/view-team.component";
import { TeamViewRendererComponent } from "./renderers/team-view-renderer/team-view-renderer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertsComponent } from "./alerts/alerts.component";
import { LoginComponent } from "./user-management/login/login.component";
import { RegisterComponent } from "./user-management/register/register.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "simulator", component: SimulatorComponent },
  { path: "teams", component: TeamsComponent },
  { path: "players", component: PlayersComponent },
  { path: "create-player", component: CreatePlayerComponent },
  { path: "create-team", component: CreateTeamComponent },
  { path: "add-teams/:data", component: AddTeamsComponent },
  { path: "add-players/:data", component: AddPlayersComponent },
  { path: "view-team/:data", component: ViewTeamComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "examples", component: GridExampleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PlayersComponent,
    TeamsComponent,
    SimulatorComponent,
    CreatePlayerComponent,
    GridExampleComponent,
    PlayerImageRendererComponent,
    CreateTeamComponent,
    ReroutersComponent,
    AddTeamsComponent,
    AddPlayersComponent,
    RerouterPlayersComponent,
    ViewTeamComponent,
    TeamViewRendererComponent,
    AlertsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AgGridModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
