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

let categorias = [
    {
        "nombre": "Comida",
        "hijas": [
            {
                "nombre": "Dulce",
                "hijas": [
                    {
                        "nombre": "Cereales",
                        "hijas": []
                    },
                    {
                        "nombre": "Galletas",
                        "hijas": []
                    },
                    {
                        "nombre": "Chocolate",
                        "hijas": []
                    }
                ]
            },
            {
                "nombre": "Saludable",
                "hijas": [
                    {
                        "nombre": "Cereales",
                        "hijas": []
                    },
                    {
                        "nombre": "Pasta",
                        "hijas": []
                    }
                ]
            }
        ]
    }
];


let productos = [
    {
        "nombre": "Zucaritas",
        "estrellas": 3,
        "precio": 300,
        "tienda": "DD Market",
        "descripcion": "Muy ricas, sisi muy muy ricas",
        "id": "777",
        "categorias": [
            {
                "nombre": "Comida",
                "hijas": [
                    {
                        "nombre": "Dulce",
                        "hijas": [
                            {
                                "nombre": "Cereales",
                                "hijas": []
                            }
                        ]
                    }
                ]
            },
            //{
                //Otra posible categoría
            //}
        ],
        "especificacion": [
            "Cereal dulce de maíz",
            "0 proteína 100% lípidos",
            "Totalmente mortal para el cuerpo"
        ],
        "imagenes": [
            "img/Zucaritas.webp"
        ],
        "comentarios": [
            {
                "usuario": "Vale20m",
                "estrellas": 3,
                "comentario": "No me gusta esto 0 proteína",
                "foto": "/img/Flamin-Go.webp",
                "fecha": "04/05/2004",
                "id": 1,
                "respuestas": [
                    {
                        "usuario": "kingstolas",
                        "comentario": "Callate o te tiro un cuchillo",
                        "foto": "/img/Flamin-Go.webp",
                        "fecha": "05/05/2004",
                        "id": 2,
                        "respuestas": [
                            {
                                "usuario": "kingstolas",
                                "comentario": "Callate o te tiro un cuchillo",
                                "foto": "/img/Flamin-Go.webp",
                                "fecha": "05/05/2004",
                                "id": 3,
                                "respuestas": [
                                    {
                                        "usuario": "kingstolas",
                                        "comentario": "Callate o te tiro un cuchillo",
                                        "foto": "/img/Flamin-Go.webp",
                                        "id": 4,
                                        "fecha": "05/05/2004",
                                        "respuestas": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "usuario": "Santurio",
                        "comentario": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "foto": "/img/Flamin-Go.webp",
                        "fecha": "01/05/2008",
                        "id": 5,
                        "respuestas": [
                            {
                                "usuario": "kingstolas",
                                "comentario": "Callate o te tiro un cuchillo",
                                "foto": "/img/Flamin-Go.webp",
                                "fecha": "05/05/2004",
                                "id": 6,
                                "respuestas": [
                                    {
                                        "usuario": "kingstolas",
                                        "comentario": "Callate o te tiro un cuchillo",
                                        "foto": "/img/Flamin-Go.webp",
                                        "id": 7,
                                        "fecha": "05/05/2004",
                                        "respuestas": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "usuario": "BlckDev",
                "estrellas": 5,
                "comentario": "Mmm q ñicooo",
                "foto": "/img/Flamin-Go.webp",
                "fecha": "20/09/2024",
                "id": 8,
                "respuestas": []
            },
        ]
    },
    {
        "nombre": "Cereal Dulce",
        "categorias": {
            "Comida": {
                "Dulce": [
                    "Cereales"
                ]
            },
        },
        "precio": 150,
        "imagenes": [
            "img/cereal1.webp"
        ],
        "estrellas": 4,
        "tienda": "Tienda A",
        "comentarios": []
    },
    {
        "nombre": "Oreo",
        "categorias": {
            "Comida": {
                "Dulce": [
                    "Galletas"
                ]
            },
        },
        "precio": 200,
        "imagenes": [
            "img/oreo.webp", 
            "img/oreo1.webp"
        ],
        "estrellas": 5,
        "tienda": "Tienda B",
        "comentarios": []
    },
    {
        "nombre": "Pasta Integral",
        "categorias": {
            "Comida": {
                "Saludable": [
                    "Pasta"
                ]
            },
        },
        "precio": 180,
        "imagenes": [
            "img/pasta.webp"
        ],
        "estrellas": 3,
        "tienda": "Tienda C",
        "comentarios": []
    },
    {
        "nombre": "Chocolate Amargo",
        "categorias": {
            "Comida": {
                "Dulce": [
                    "Chocolate"
                ]
            },
        },
        "precio": 250,
        "imagenes": [
            "img/chocolate.webp", 
            "img/chocolate1.webp"
        ],
        "estrellas": 5,
        "tienda": "Tienda D",
        "comentarios": []
    },
    {
        "nombre": "Cereal Saludable",
        "categorias": {
            "Comida": {
                "Saludable": [
                    "Cereales"
                ]
            },
        },
        "precio": 220,
        "imagenes": [
            "img/cereal.webp"
        ],
        "estrellas": 4,
        "tienda": "Tienda E",
        "comentarios": []
    }
];

localStorage.setItem("categorias", JSON.stringify(categorias)); // BORRAR SI SE QUIEREN AGREGAR MÁS
if(!JSON.parse(localStorage.getItem("productos"))){
    localStorage.setItem("productos", JSON.stringify(productos));
}

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