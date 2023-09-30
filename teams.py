from players import Jugador


class Team:
    def __init__(self, team_list):
        self.team_list = team_list
        self.unparsed_keeper = self.team_list["portero"]
        self.unparsed_players = self.team_list["jugadores"]
        self.keeper = self.parse_keeper()
        self.players = self.parse_players()

    def parse_keeper(self):
        return Jugador(self.unparsed_keeper["nombre"], self.unparsed_keeper["pos"], self.unparsed_keeper["rango"])

    def parse_players(self):
        c_players = []
        for i in self.unparsed_players:
            c_players.append(Jugador(i["nombre"], i["pos"], i["rango"]))
        return c_players


los_cimitarras = {
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
