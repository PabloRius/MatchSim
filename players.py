class Jugador:
    def __init__(self, nombre, pos, rango):
        self.nombre = nombre
        self.pos = pos
        self.rango = rango
        self.stats = rangos[pos][rango]
        if pos != "portero":
            self.tiro = self.stats["tiro"]
            self.regate = self.stats["regate"]
            self.defensa = self.stats["defensa"]
        elif pos == "portero":
            self.parada = self.stats


rangos = {
    "delantero": {
        "C": {
            "tiro": 5,
            "regate": 3,
            "defensa": 1
        },
        "B": {
            "tiro": 6,
            "regate": 4,
            "defensa": 2
        },
        "A": {
            "tiro": 7,
            "regate": 5,
            "defensa": 3
        },
        "S": {
            "tiro": 8,
            "regate": 6,
            "defensa": 4
        },
        "SS": {
            "tiro": 9,
            "regate": 7,
            "defensa": 5
        },
        "SSS": {
            "tiro": 10,
            "regate": 8,
            "defensa": 6
        }
    },
    "medio": {
        "C": {
            "tiro": 3,
            "regate": 5,
            "defensa": 3
        },
        "B": {
            "tiro": 4,
            "regate": 6,
            "defensa": 4
        },
        "A": {
            "tiro": 5,
            "regate": 7,
            "defensa": 5
        },
        "S": {
            "tiro": 6,
            "regate": 8,
            "defensa": 6
        },
        "SS": {
            "tiro": 7,
            "regate": 9,
            "defensa": 7
        },
        "SSS": {
            "tiro": 8,
            "regate": 10,
            "defensa": 8
        },
    },
    "defensa": {
        "C": {
            "tiro": 1,
            "regate": 3,
            "defensa": 5
        },
        "B": {
            "tiro": 2,
            "regate": 4,
            "defensa": 6
        },
        "A": {
            "tiro": 3,
            "regate": 5,
            "defensa": 7
        },
        "S": {
            "tiro": 4,
            "regate": 6,
            "defensa": 8
        },
        "SS": {
            "tiro": 5,
            "regate": 7,
            "defensa": 9
        },
        "SSS": {
            "tiro": 6,
            "regate": 8,
            "defensa": 10
        },
    },
    "portero": {
        "C": 5,
        "B": 6,
        "A": 7,
        "S": 8,
        "SS": 9,
        "SSS": 10
    }
}
