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

let usuarios = [
    {
        "nombre": "Salvador",
        "apellido": "Vanoli",
        "nickname": "salvaelpro777",
        "tipo": "proveedor",
        "email": "salva@salva.com",
        "fecha": "2004-05-01",
        "foto": "img/test.jpg",
        "web": "salva.com",
        "empresa": "salvaEnterprise",
        "id": "0",
        "ordenes": [
            {
                "id": 0,
                "fecha": "2024-09-24",
                "productos": [
                    {
                        "nombre": "Zucaritas",
                        "precio": 300,
                        "descripcion": "Muy ricas, sisi muy muy ricas",
                        "imagenes": [
                          "/img/test.jpg",
                          "/img/test.jpg"
                        ],
                        "id": "777",
                        "cantidad": 1
                    },
                    {
                        "nombre": "WATAFAK",
                        "precio": 200,
                        "descripcion": "sii",
                        "imagenes": [
                          "/img/test.jpg",
                          "/img/test.jpg"
                        ],
                        "id": "778",
                        "cantidad": 5
                    }
                ]
            },
            {
                "id": 1,
                "fecha": "2024-09-27",
                "productos": [
                    {
                        "nombre": "Zucaritas",
                        "precio": 400,
                        "descripcion": "Muy ricas, sisi muy muy ricas",
                        "imagenes": [
                          "/img/test.jpg",
                          "/img/test.jpg"
                        ],
                        "id": "777",
                        "cantidad": 6
                    },
                    {
                        "nombre": "SSSSSSSSSSSESx",
                        "precio": 200,
                        "descripcion": "sii",
                        "imagenes": [
                          "/img/test.jpg",
                          "/img/test.jpg"
                        ],
                        "id": "778",
                        "cantidad": 8
                    }
                ]
            },
        ],
        "productos": [
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
                ]
            }
        ]
    }
]

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