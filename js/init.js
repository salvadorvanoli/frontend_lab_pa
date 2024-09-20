let productos = [
    {
        "nombre": "Zucaritas",
        "estrellas": 3,
        "precio": 300,
        "descripcion": "Muy ricas, sisi muy muy ricas",
        "id": "777",
        "categorias": [
            "Comida",
            "Dulce",
            "Cereales"
        ],
        "especificacion": [
            "Cereal dulce de maíz",
            "0 proteína 100% lípidos",
            "Totalmente mortal para el cuerpo"
        ],
        "imagenes": [
            "/img/test.jpg",
            "/img/test.jpg"
        ],
        "comentarios": [
            {
                "usuario": "Vale20m",
                "estrellas": 3,
                "comentario": "Una re pija esto 0 proteína",
                "foto": "/img/Flamin-Go.webp",
                "fecha": "04/05/2004",
                "respuestas": [
                    {
                        "usuario": "kingstolas",
                        "comentario": "Callate o te tiro un cuchillo",
                        "foto": "/img/Flamin-Go.webp",
                        "fecha": "05/05/2004"
                    },
                    {
                        "usuario": "Santurio",
                        "comentario": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "foto": "/img/Flamin-Go.webp",
                        "fecha": "01/05/2008"
                    }
                ]
            },
            {
                "usuario": "BlckDev",
                "estrellas": 5,
                "comentario": "Mmm q ñicooo",
                "foto": "/img/Flamin-Go.webp",
                "fecha": "20/09/2024",
                "respuestas": []
            },
        ]
    }
];

function mostrarAlerta(mensaje) {
    let alertaExistente = document.getElementById("alerta");
    
    if (alertaExistente) {
        alertaExistente.remove();
    }

    const alerta = document.createElement("div");
    alerta.className = "alert alert-danger absoluto";
    alerta.setAttribute("role", "alert");
    alerta.id = "alerta";
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="close" aria-label="Close" onclick="this.parentElement.remove();">
            <span aria-hidden="true">&times;</span>
        </button>
    `;

    document.getElementsByTagName("body")[0].appendChild(alerta);
}