import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './main-components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './listing-components/players/players.component';
import { TeamsComponent } from './listing-components/teams/teams.component';
import { SimulatorComponent } from './sim/simulator/simulator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePlayerComponent } from './listing-components/players/create-player/create-player.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridExampleComponent } from './listing-components/players/grid-example/grid-example.component';
import { PlayerImageRendererComponent } from './renderers/player-image-renderer/player-image-renderer.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'create-player', component: CreatePlayerComponent},
  { path: 'examples', component: GridExampleComponent}
]

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
    PlayerImageRendererComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
