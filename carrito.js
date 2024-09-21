document.addEventListener("DOMContentLoaded", function(e) {

    form1 = document.querySelector("#formCarrito");

    form1.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            
        }

        form.classList.add('was-validated');
    }, false);

    // form2 = document.querySelector("#formEnvio");

    function cargarElementosCarrito(array){
        if (array.length === 0){
            return;
        } else {
            array.forEach(element => {
                
            });
        }
    }








    selectDepartamento = document.querySelector("#departamento");
    selectedCiudad = document.querySelector("ciudad");
    selectDepartamento.addEventListener("change", function(e){
        if (this.value != "0"){
            selectedCiudad.
        }
    });
    
    selectDepartamento.value = "0";

    selectedCiudad = document.querySelector("ciudad");











    /*
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
        
                form.classList.add('was-validated');
            }, false)
        })
    })()

    */

});