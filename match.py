import random
import time
import players
from teams import *


class Partido:
    def __init__(self, local_team, visitor_team, duration):
        self.local_team = Team(local_team)
        self.visitor_team_obj = Team(visitor_team)
        self.duration = duration*60  # in seconds
        self.team_turn = "local"

    def switch_team_turn(self):
        if self.team_turn == "local":
            self.team_turn = "visitor"
        elif self.team_turn == "visitor":
            self.team_turn = "local"

    def simular_partido(self):
        seconds = 0
        while seconds < self.duration:
            print('Minute %d, second %d, turn: %s\n', seconds//60, seconds % 60, self.team_turn)

            """goles_local = 0
            goles_visitante = 0
    
            duracion_partido = 90  # Duración del partido en minutos
    
            print(f"Comienza el partido entre {equipo_local} y {equipo_visitante}!\n")
    
            for minuto in range(1, duracion_partido + 1):
                # Simulamos un evento en cada minuto
                evento = random.choice(["Nada", "Tiro al arco", "Pase", "Falta"])
    
                if evento == "Tiro al arco":
                    # Determinar quién está tirando
                    jugador = random.choice([jugador1, jugador2, jugador3])
    
                    # Probabilidad de éxito basada en la habilidad de tiro del jugador
                    probabilidad_exito = jugador.habilidad_tiro
    
                    if random.random() < probabilidad_exito:
                        print(f"{minuto}' - ¡GOL para {equipo_local} por {jugador.nombre}!")
                        goles_local += 1
                    else:
                        print(f"{minuto}' - Tiro al arco de {equipo_local} por {jugador.nombre} que se va desviado.")
    
                elif evento == "Pase":
                    # Determinar quién está haciendo el pase y al receptor
                    jugador_pase = random.choice([jugador1, jugador2, jugador3])
                    jugador_receptor = random.choice([jugador1, jugador2, jugador3])
    
                    # Probabilidad de éxito basada en la habilidad de pase del jugador
                    probabilidad_exito = jugador_pase.habilidad_pase
    
                    if random.random() < probabilidad_exito:
                        print(f"{minuto}' - Buen pase de {jugador_pase.nombre} a {jugador_receptor.nombre}.")
                    else:
                        print(f"{minuto}' - Pase de {jugador_pase.nombre} que es interceptado por la defensa.")
    
                elif evento == "Falta":
                    # Simulamos una falta
                    print(f"{minuto}' - Falta cometida por {equipo_local}.")
    
                # Puedes agregar más eventos y lógica aquí
    
                time.sleep(0.5)  # Añade un pequeño retardo para la simulación en tiempo real
    
            # Resultado final
            print(f"\nFinal del partido: {equipo_local} {goles_local} - {goles_visitante} {equipo_visitante}")"""

            """Every 2 seconds a new event occurs"""
            time.sleep(2)
            seconds += 2
            self.switch_team_turn()
        print("Match is over!")


if __name__ == "__main__":
    current_match = Partido(los_cimitarras, dragon_link, 2)
    current_match.simular_partido()

