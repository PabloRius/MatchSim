from api.src.players import Jugador


class Team:
    def __init__(self, team_list: dict):
        self.team_list = team_list
        self.unparsed_keeper = self.team_list["portero"]
        self.unparsed_players = self.team_list["jugadores"]
        self.keeper = self.parse_keeper()
        self.players = self.parse_players()
        self.goals = 0
        self.name = self.team_list["nombre"]

    def parse_keeper(self) -> Jugador:
        return Jugador(self.unparsed_keeper["nombre"], self.unparsed_keeper["pos"], self.unparsed_keeper["rango"])

    def parse_players(self) -> list[Jugador]:
        c_players = []
        for i in self.unparsed_players:
            c_players.append(Jugador(i["nombre"], i["pos"], i["rango"]))
        return c_players

jude = {
    "nombre": "Jude",
    "pos": "medio",
    "rango": "SSS"
}

samford = {
    "nombre": "Samford",
    "pos": "delantero",
    "rango": "SS"
}

torch = {
    "nombre": "Torch",
    "pos": "delantero",
    "rango": "SS"
}

los_cimitarras = {
    "nombre": "Los Cimitarras",
    "jugadores": [
        {
            "nombre": "Shakir",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Nazim",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Said",
            "pos": "delantero",
            "rango": "S"
         },
        {
            "nombre": "Rashid",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Kamil",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Kasim",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Batal",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Khalil",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Assad",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Tamir",
            "pos": "medio",
            "rango": "A"
         }
    ],
    "portero": {
            "nombre": "Sultan",
            "pos": "portero",
            "rango": "A"
         }
}
dragon_link = {
    "nombre": "Dragon Link",
    "jugadores": [
        {
            "nombre": "Quintet",
            "pos": "defensa",
            "rango": "S"
         },
        {
            "nombre": "Viisi",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Pentra",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Cinco",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Delafünfe",
            "pos": "medio",
            "rango": "S"
         },
        {
            "nombre": "Quinque",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Cinquini",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Fivier",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Quintola",
            "pos": "delantero",
            "rango": "S"
         },
        {
            "nombre": "Pentona",
            "pos": "delantero",
            "rango": "A"
         }
    ],
    "portero": {
            "nombre": "Cinquedea",
            "pos": "portero",
            "rango": "SS"
         }
}
prominence = {
    "nombre": "Prominence",
    "jugadores": [
        {
            "nombre": "Baller",
            "pos": "defensa",
            "rango": "S"
         },
        {
            "nombre": "Balckle",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Seats",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Bomber",
            "pos": "defensa",
            "rango": "S"
         },
        {
            "nombre": "Heat",
            "pos": "medio",
            "rango": "S"
         },
        {
            "nombre": "Lean",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Bountine",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Sidern",
            "pos": "medio",
            "rango": "A"
         },
        torch,
        {
            "nombre": "Neppten",
            "pos": "delantero",
            "rango": "S"
         }
    ],
    "portero": {
            "nombre": "Grent",
            "pos": "portero",
            "rango": "S"
         }
}
los_fertilia = {
    "nombre": "Los Fertilia",
    "jugadores": [
        {
            "nombre": "Drone",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Moth",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Antwa",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Tis",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Putterf",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Hopper",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Stag",
            "pos": "medio",
            "rango": "S"
         },
        {
            "nombre": "Locus",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Taran",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Banda",
            "pos": "medio",
            "rango": "S"
         }
    ],
    "portero": {
            "nombre": "Longa",
            "pos": "portero",
            "rango": "A"
         }
}
los_guardianes_de_la_reina = {
    "nombre": "Los Guardianes de la Reina",
    "jugadores": [
        {
            "nombre": "Elma",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Alice",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Diana",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Nestore",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Niccolo",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Pietro",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Carlos",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Luca",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Matteo",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Petronio",
            "pos": "delantero",
            "rango": "S"
         }
    ],
    "portero": {
            "nombre": "Gabriella",
            "pos": "portero",
            "rango": "A"
         }
}
brain = {
    "nombre": "Brain",
    "jugadores": [
        {
            "nombre": "Leading",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Terry",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Marvel",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Noel",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Rock",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Tell",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Buster",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Seller",
            "pos": "delantero",
            "rango": "B"
         },
        {
            "nombre": "Kind",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Turner",
            "pos": "delantero",
            "rango": "A"
         }
    ],
    "portero": {
            "nombre": "Feldt",
            "pos": "portero",
            "rango": "A"
         }
}
los_naiadi = {
    "nombre": "Los Naidi",
    "jugadores": [
        {
            "nombre": "Ness",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Galila",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Urumi",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Plink",
            "pos": "medio",
            "rango": "S"
         },
        {
            "nombre": "Capis",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Sarama",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Chuluka",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Batur",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Sevan",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Valha",
            "pos": "delantero",
            "rango": "A"
         }
    ],
    "portero": {
            "nombre": "Van",
            "pos": "portero",
            "rango": "A"
         }
}
royal_academy = {
    "nombre": "Royal Academy",
    "jugadores": [
        {
            "nombre": "Drent",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Simmons",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Alan",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Gus",
            "pos": "defensa",
            "rango": "A"
         },
        {
            "nombre": "Waldon",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Bloom",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Swing",
            "pos": "medio",
            "rango": "A"
         },
        {
            "nombre": "Hatch",
            "pos": "medio",
            "rango": "A"
         },
        jude,
        samford
    ],
    "portero": {
            "nombre": "King",
            "pos": "portero",
            "rango": "S"
         }
}
dragones_de_fuego_go = {
    "nombre": "Dragones de Fuego Go",
    "jugadores": [
        {
            "nombre": "Sin-Jae",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Jeong-Ho",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Yeong-Jin",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Woo-Jin",
            "pos": "defensa",
            "rango": "B"
         },
        {
            "nombre": "Geon-Woo",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Ji-Hoon",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "Min-Seo",
            "pos": "medio",
            "rango": "B"
         },
        {
            "nombre": "So-Yeon",
            "pos": "delantero",
            "rango": "B"
         },
        {
            "nombre": "Jun-Yeong",
            "pos": "delantero",
            "rango": "A"
         },
        {
            "nombre": "Jun-Ho",
            "pos": "delantero",
            "rango": "B"
         }
    ],
    "portero": {
            "nombre": "Do-Hyeon",
            "pos": "portero",
            "rango": "B"
         }
}