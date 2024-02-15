// El código va aquí -> 
//Llamamamos a todos los elementos con los que vamos a trabajar
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);//Comienza numeración del index (tbody está en la posición 0)
//Limpia toda la lista de compras incliyendo los campos

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal")
let precioTotal = document.getElementById("precioTotal")

let precio = 0;
let isValid = true;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array()

//Botón "limpiar todo"
btnClear.addEventListener("click", function(event) {
    event.preventDefault();
    txtNombre.value=""; //Sustituir valores agregados por un valor vacio (campo en blanco)
    txtNumber.value="";
    alertValidacionesTexto.innerHTML= "";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador)
    localStorage.setItem("totalEnProductos", totalEnProductos)
    localStorage.setItem("costoTotal", costoTotal)
    localStorage.removeItem("datos");
    datos = new Array();
    cuerpoTabla.innerHTML="";
    txtNombre.focus(); //El cursor se pone autimáticamente en el campo del nombre
});//btnClear

function validarCantidad() {
    if(txtNumber.value.length == 0){
        return(false)
    }//if length

     if (isNaN(txtNumber.value)){
        return false;
     }//isNAN

     if (Number(txtNumber.value) <=0 ) {
        return false;
     }

    return(true)
}//validar cantidad

function getPrecio() {
    return parseInt((Math.random() * 90) *100) /100; //Se multiplica y se divide por 100 para sacar decimales
}//getPRecio

//Botón "agregar"
btnAgregar.addEventListener("click", function(event) {
     event.preventDefault();
     //Variables iniciales
     alertValidacionesTexto.innerHTML= "";
     alertValidaciones.style.display="none";
     txtNombre.style.border="";
     txtNumber.style.border="";
     isValid=true;
     //Quitar espacios para respetar longitudes 
     txtNombre.value = txtNombre.value.trim();
     txtNumber.value = txtNumber.value.trim();
     if(txtNombre.value.length < 3){
          alertValidacionesTexto.insertAdjacentHTML("beforeend",
          `El <strong>Nombre </strong> no es correcto <br/>`);
          alertValidaciones.style.display="block";
          txtNombre.style.border = "solid red thin";
          isValid=false;
     }//If length -- Esto es un condicional

     if(! validarCantidad()){ //"!" Es una negación 
          alertValidacionesTexto.insertAdjacentHTML("beforeend", `
          La <strong>Cantidad </strong> no es correcta <br/>`
          );
          alertValidaciones.style.display="block";
          txtNumber.style.border = "solid red thin";
          isValid=false
     }//If !Validar cantidad 

     if(isValid){
        contador++
        precio = getPrecio();
        row = `<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;
        //Definición de un objeto {string: value,...,...,}
        let elemento = `{"id": ${contador},
                        "nombre": "${txtNombre.value}",
                        "cantidad": ${txtNumber.value},
                        "precio": ${precio}
        }`;

        //Conversión del objeto y colocación en arreglo "datos"
        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos", JSON.stringify(datos)) //Convertir a cadena de caracteres los objetos que creamos

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos+= parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `${costoTotal.toFixed(2)}`

        //PAra guardar en el navegador los datos
        localStorage.setItem("contadorProductos", contador)
        localStorage.setItem("totalEnProductos", totalEnProductos)
        localStorage.setItem("costoTotal", costoTotal)

        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

     }//If is valid
      //Agregar  los renglones  a la tabla
});//Boton agregar

window.addEventListener("load", function (event) {
    event.preventDefault();
    if(this.localStorage.getItem("contadorProductos") != null){
       contador = this.localStorage.getItem("contadorProductos");
       totalEnProductos = this.localStorage.getItem("totalEnProductos");
       costoTotal = Number(this.localStorage.getItem("costoTotal"));

       contadorProductos.innerText = contador;
       productosTotal.innerText = totalEnProductos;
       precioTotal.innerText= `${costoTotal.toFixed(2)}`
    }//if null

    if(this.localStorage.getItem("datos") !=null){
        datos = JSON.parse(this.localStorage.getItem("datos"))
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });//For each
    }
});//Window load
