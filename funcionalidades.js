//funcion para que al hacer click en una imagen pequeña, cambie la imagen grande
    let galeriaProductos= document.getElementById("producto");

    let imagenGrande = galeriaProductos.querySelector(".producto__imagen");

    let imagenesPequeñas= galeriaProductos.querySelector(".producto__thumbs")

   

    //funciones de las imagenes pequeñas
    imagenesPequeñas.addEventListener('click', (elemento)=>{
        if(elemento.target.tagName=="IMG"){ 
            let rutaImagenClickeada= elemento.target.src;
            
            //obtenemos la posicion del ultimo /
            let indexUltimaBarraRutaImg= rutaImagenClickeada.lastIndexOf('/');
            
            //cortamos el string par aobtener solo el nombre de la imagen 
            let nombreImgClickeada=rutaImagenClickeada.substring(indexUltimaBarraRutaImg +1);
            
            //cambiamos la imagen del cuadro grande al cambairle la ruta
            imagenGrande.src= `./img/tennis/${nombreImgClickeada}`;

        }

    })

//funciones para cuando se hace click en los botones de colores

    let color= galeriaProductos.querySelector("#propiedad-color");

    color.addEventListener('click' , (elemento)=>{
        if(elemento.target.tagName=="INPUT"){
            let colorACambiar= elemento.target.value;
            imagenGrande.src= `./img/tennis/${colorACambiar}.jpg`;
        }

    })

//funcion para aumentar o disminuir la cantidad de productos
    let incrementarCantidad= galeriaProductos.querySelector('#incrementar-cantidad');
    let disminuirCantidad= galeriaProductos.querySelector('#disminuir-cantidad');
    let inputCantidad = galeriaProductos.querySelector('#cantidad');

    incrementarCantidad.addEventListener('click', (elemento)=>{
        inputCantidad.value= parseInt(inputCantidad.value) +1;
    })
    disminuirCantidad.addEventListener('click', (elemento)=>{
        if(parseInt(inputCantidad.value)!=1){
            inputCantidad.value= parseInt(inputCantidad.value) -1;
        }
        
    })
//funciones del carito
    
    //abrir carrito
    let botonesAbrirCarrito= document.querySelectorAll('[data-accion="abrir-carrito"]');
    //va a abrir el carrito, revisar cuales son los productos y si no hya, mostrar un mnesaje
    let ventaCarrito=document.getElementById("carrito");
  
    //ACTUALIZAR EL CARRITO, FUNCIONES INTERIORES
    //formatea numeros a pesos argentinos
    let formateadorMoneda= new Intl.NumberFormat('es-AR', {style: 'currency', currency:'ARS'});
    let renderCarrito= ()=>{
        ventaCarrito.classList.add("carrito--active");

        //corrijo el error que duplica los elementos agragados al carrito, elmina todo y se vuelve a construir el carrito
        let elementosAEliminar= ventaCarrito.querySelectorAll('.carrito__producto');
        elementosAEliminar.forEach((e)=>e.remove());

        //iteramos sobre cada producto del carrito y lo mostramos
        carrito.forEach((elemento)=>{

            elemento.id

            //establecemos la ruta de la imagen del carrito
            let rutaImagenPuqueña; 
            if (elemento.color=='rojo'){
                rutaImagenPuqueña= './img/tennis/rojo.jpg';
            }else if (elemento.color=='amarillo'){
                rutaImagenPuqueña= './img/tennis/amarillo.jpg'
            }else{
                rutaImagenPuqueña= galeriaProductos.querySelectorAll('.producto__thumb-img')[0].src;
            }

          
            //creamos una plantilla del corido html de los elemenbtos que van a estar dentro del carrito
        
            let plantillaProducto=`
                                        <div class="carrito__producto-info">
                                            <img src="${rutaImagenPuqueña}" alt="" class="carrito__thumb" />
                                            <div>
                                                <p class="carrito__producto-nombre">
                                                <span class="carrito__producto-cantidad">${elemento.cantidad} x </span>${elemento.nombre}                                                </p>
                                                    <p class="carrito__producto-propiedades">
                                                       Tamaño:<span>${elemento.tamaño}</span> Color:<span>${elemento.color}</span>
                                                    </p>
                                            </div>
                                        </div>
                                        <div class="carrito__producto-contenedor-precio">
                                            <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                                    />
                                                </svg>
                                            </button>
                                            <p class="carrito__producto-precio">${formateadorMoneda.format(productos.productos[0].precio*parseInt(elemento.cantidad))}</p>
                                        </div>
                                        
            `
            //creamos el div que va a contener la plantilla
            let itemCarrito= document.createElement('div');
            //agregamos la calse al div
            itemCarrito.classList.add('carrito__producto');

            //insertar la plantilla en el div creado
            itemCarrito.innerHTML=plantillaProducto;

            //agregamos el producto a la ventana del carrito
            ventaCarrito.querySelector('.carrito__body').appendChild(itemCarrito); 

            

        });

    };
    botonesAbrirCarrito.forEach((boton)=>{
        boton.addEventListener('click', ()=>{
            
            renderCarrito();
        })

    });

    //cerrar carrito
    let botonesCerrarCarrito= document.querySelectorAll('[data-accion="cerrar-carrito"]');

    let cerrarCarrito= ()=>{
        ventaCarrito.classList.remove("carrito--active");
    };
    botonesCerrarCarrito.forEach((boton)=>{
        boton.addEventListener('click', ()=>{
            
            cerrarCarrito();
        })

    });

    //agregar un producto al carrito
    let carrito = [];

    let botonAgregarAcarrito= document.getElementById('agregar-al-carrito');
    
    botonAgregarAcarrito.addEventListener('click', (e)=>{
        let id= galeriaProductos.dataset.productoId;
        let cantidad = parseInt(galeriaProductos.querySelector('#cantidad').value);
        let nombre = galeriaProductos.querySelector('.producto__nombre').innerText;
        let color= galeriaProductos.querySelector ('#propiedad-color input:checked').value;
        let tamaño= galeriaProductos.querySelector ('#propiedad-tamaño input:checked').value;
        if(carrito.length>0)
            {
                let productoEnCarrito= false;

                carrito.forEach((item)=>{
                    if(item.id==id && item.tamaño== tamaño && item.color==color && item.nombre==nombre)
                    {
                        item.cantidad+=cantidad;
                        productoEnCarrito=true;
                    }         
                });
                if(!productoEnCarrito)
                {
                    carrito.push(
                        {id:id,
                        nombre:nombre,
                        cantidad:cantidad,
                        color:color, 
                        tamaño:tamaño
                    } );  
                }
            }

        else
            {
                carrito.push(
                    {id:id,
                    nombre:nombre,
                    cantidad:cantidad,
                    color:color, 
                    tamaño:tamaño
                } );      
        
            }    
        
    });



    // botones eliminar elementos del carrito
    
    ventaCarrito.addEventListener('click',(e)=>{
        if(e.target.closest('button')?.dataset.accion =="eliminar-item-carrito"){
            let elementosCarrito = e.target.closest('.carrito__producto');
            let indexElementosCarrito= [...ventaCarrito.querySelectorAll('.carrito__producto')].indexOf(elementosCarrito);
            carrito= carrito.filter((item, index)=>{

               if(index !== indexElementosCarrito){
                return item;
               };
               
            });
            renderCarrito();
        };
    });




//simulo una base de datos para obtener los datos q se vana  agregar al carrito
    let productos= {
                    productos :[
                                    {
                                        id:"1",
                                        nombre:"Tennis Converse Standard.",
                                        descripcion: "Lorem ipsum dolor sit amet.",
                                        precio: 500.0,
                                        colores:['negro', 'rojo','amarillo'],
                                        tamaños: ['1,5','2','2,5','3','3,5', '4' ]
                                    }
                                ]
                   } ; 