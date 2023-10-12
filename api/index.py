import random
import time
import math
import json

import sys
import os
current_directory = os.path.dirname(os.path.realpath(__file__))
sys.path.append(current_directory)

from api.src.teams import *

pronting = True

def pront(content: str):
    if(pronting):
        print(content)

class Partido:
    def __init__(self, local_team: dict, visitor_team: dict, duration: int):
        self.local_team = Team(local_team)
        self.visitor_team = Team(visitor_team)
        self.duration = duration*60  # in seconds
        self.possession = "local"
        self.possession_player = random.choice(self.local_team.players)
        self.shoot_cap: int = 0

    def switch_team_turn(self):
        if self.possession == "local":
            self.possession = "visitor"
        elif self.possession == "visitor":
            self.possession = "local"
    
    def goal(self, team: str, secs: int):
        print("|"*50)
        print("|"*50)
        print(f"{secs//60}:{secs%60} - GOL DEL EQUIPO {team} - {self.possession_player.nombre}")
        print("|"*50)
        print("|"*50)

    def sigmoid_function(self, attacker: int, defender: int) -> tuple[float, int]:
        full_posib =  1 / (1 + math.exp(-(attacker - defender)))
        return full_posib, int(full_posib*100) 

    def simular_partido(self, team1: str, team2: str):
        seconds = 0
        pront(f"Comienza el partido entre { self.local_team.name } y { self.visitor_team.name } acaba de empezar.\n")
        report = {}
        while seconds < self.duration:
            event_choice = random.randint(1, 60 + self.shoot_cap)
            if event_choice <= 40:
                opposing_player:Jugador
                if self.possession == "local":
                    opposing_player = random.choice(self.visitor_team.players)
                elif self.possession == "visitor":
                    opposing_player = random.choice(self.local_team.players)
                else:
                    pront("There was an error during the match and it had to be terminated, no opposing player could be choosen")
                    return 
                
                pront(f"{self.possession_player.nombre} regate: {self.possession_player.regate} tiene la posesión, pero {opposing_player.nombre} defensa: {opposing_player.defensa} se encuentra en su camino, ¿conseguirá pasar?\n")
                
                chances = self.sigmoid_function(self.possession_player.regate, opposing_player.defensa)
                rint = random.randint(0, 100)
                if rint <= chances[1]:
                    pront("Ha conseguido regatear\n")
                elif rint > chances[1]:
                    self.switch_team_turn()
                    self.possession_player = opposing_player
                    pront("No consiguió regatear\n")

                # Batalla entre jugadores
                self.shoot_cap += 5
                pass
            elif 40 < event_choice <= 60:
                managed_list: list[Jugador] = []
                if self.possession == "local":
                    for i in self.local_team.players:
                        if i.nombre != self.possession_player.nombre:
                            managed_list.append(i)
                elif self.possession == "visitor":
                    for i in self.visitor_team.players:
                        if i.nombre != self.possession_player.nombre:
                            managed_list.append(i)
                new_possesor = random.choice(managed_list)
                pront(f"El jugador {self.possession_player.nombre} del equipo {self.possession} le pasa el balón a su compañero {new_possesor.nombre}\n")
                self.possession_player = new_possesor
                # El jugador con la posesión pasa a otro de su equipo
                self.shoot_cap += 2
                pass
            else:
                keeper: Jugador
                if self.possession == "local":
                    keeper = self.visitor_team.keeper
                elif self.possession == "visitor":
                    keeper = self.local_team.keeper
                else:
                    pront("There was an error during the match and it had to be terminated, no opposing player could be choosen")
                    return
                pront(f"El jugador {self.possession_player.nombre} tiro: {self.possession_player.tiro} del equipo {self.possession} tira a puerta, ¿podrá {keeper.nombre} parada: {keeper.parada} parársela?")
                
                chances = self.sigmoid_function(self.possession_player.tiro, keeper.parada)
                rint = random.randint(0, 100)
                if rint <= chances[1]:
                    if self.possession == "local":
                        self.local_team.goals += 1
                        self.goal("local", seconds)
                    elif self.possession == "visitor":
                        self.visitor_team.goals += 1
                        self.goal("visitor", seconds)
                    report[str(seconds//60)+":"+str(seconds%60)] = f"El jugador {self.possession_player.nombre} del equipo {self.possession} ha marcado un gol"
                    self.shoot_cap = 0
                elif rint > chances[1]:
                    pront("El portero la detuvo")
                    self.shoot_cap = self.shoot_cap//2
                
                if self.possession == "local":
                    self.possession_player = random.choice(self.visitor_team.players)
                    self.possession = "visitor"
                elif self.possession == "visitor":
                    self.possession_player = random.choice(self.local_team.players)
                    self.possession = "local"

            time.sleep(5)
            seconds += 5
            if (self.local_team.goals == self.visitor_team.goals) and (seconds >= self.duration):
                pront(f"Match can't be over with a draw, 30 seconds added.")
                self.duration += 30

        pront("Match is over!\n")
        if self.local_team.goals > self.visitor_team.goals:
            pront(f"The winner is { self.local_team.name } by "
                  f"{ self.local_team.goals } : { self.visitor_team.goals }")
        elif self.local_team.goals < self.visitor_team.goals:
            pront(f"The winner is { self.visitor_team.name } by "
                  f"{ self.local_team.goals } : { self.visitor_team.goals }")
        print(json.dumps(report))
        with open(f"{team1}-{team2}.json", "w") as file:
            json.dump(report, file)


if __name__ == "__main__":
    current_match = Partido(los_naiadi, royal_academy, 20)
    current_match.simular_partido("los_naiadi", "royal_academy")
