$(document).ready(function(){
    const productosList = document.querySelector('.productos-list');
    $.ajax({
        url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
        method: "post",
        data:{
            _nombreMetodo_: "categoriasProductosTienda"
        },
        success: function(resultados){
            let jsonresults = JSON.parse(resultados);
            console.log(jsonresults.resultado.Table[0]);
            for (var i=0;i<Object.keys(jsonresults.resultado.Table).length;++i){
                var opcion = document.createElement('option');
                opcion.innerHTML = jsonresults.resultado.Table[i].NOMBRE;
                opcion.value = jsonresults.resultado.Table[i].NOMBRE;
                document.getElementById('miselect').appendChild(opcion);
            }
        }       
    })
    $("#miboton").click(function(event){
        event.preventDefault();
        var nombre = $("#nombreproducto").val();
        var categoria = $("#miselect").val();
        $.ajax({
            url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
            method: "post",
            data:{
                _nombreMetodo_: "buscarProductosTienda",
                NOMBRE: nombre,
                CATEGORIA: categoria
            },
            success: function(resultados){
                document.querySelector('.productos-list').innerHTML = "";
                let jsonresults = JSON.parse(resultados);
                console.log(jsonresults);
                console.log(Object.keys(jsonresults.resultado.Table).length);

                function GetSortOrder(prop) {    
                    return function(a, b) {    
                        if (a[prop] > b[prop]) {    
                            return 1;    
                        } else if (a[prop] < b[prop]) {    
                            return -1;    
                        }    
                        return 0;    
                    }    
                }
                
                if($("#ordenar").val()=="letra")
                    jsonresults.resultado.Table.sort(GetSortOrder("NOMBRE"));
                if($("#ordenar").val()=="precio")
                    jsonresults.resultado.Table.sort(GetSortOrder("PRECIO"));
                
                if(Object.keys(jsonresults.resultado.Table).length == 0){
                    document.getElementById("resultados").style.display = "block";
                }
                else{
                    for (var i=0;i<Object.keys(jsonresults.resultado.Table).length;++i){
                        document.getElementById("resultados").style.display = "none";
                        const productoDiv = document.createElement('div');
                        productoDiv.classList.add("container");
                        productoDiv.id = "productodiv";
    
                        const productoDivrow = document.createElement('div');
                        productoDivrow.classList.add("row");
                        productoDiv.appendChild(productoDivrow);
    
                        const productoDivcol = document.createElement('div');
                        productoDivcol.classList.add("col-md-2")
                        productoDivrow.appendChild(productoDivcol);
    
                        const imagen = document.createElement('img');
                        imagen.classList.add("imagen");
                        imagen.src = jsonresults.resultado.Table[i].IMAGEN;
                        imagen.height = 100;
                        imagen.width = 100;
                        productoDivcol.appendChild(imagen);
    
                        const segundoDiv = document.createElement('div');
                        productoDivrow.appendChild(segundoDiv);
    
                        const nombre = document.createElement('h5');
                        nombre.id = "nombre";
                        nombre.classList.add("nombre");
                        nombre.innerHTML = jsonresults.resultado.Table[i].NOMBRE;
                        segundoDiv.appendChild(nombre);
    
                        const descripcion = document.createElement('h5');
                        descripcion.id = "hidden";
                        descripcion.classList.add("descripcion");
                        descripcion.innerHTML = jsonresults.resultado.Table[i].DESCRIPCION;
                        segundoDiv.appendChild(descripcion);
    
                        const presentacion = document.createElement('h5');
                        presentacion.id = "hidden";
                        presentacion.classList.add("presentacion");
                        presentacion.innerHTML = jsonresults.resultado.Table[i].PRESENTACION;
                        segundoDiv.appendChild(presentacion);
    
                        const precio = document.createElement('h6');
                        precio.id = "precio";
                        precio.classList.add("precio");
                        precio.innerHTML = jsonresults.resultado.Table[i].PRECIO + " pesos";
                        segundoDiv.appendChild(precio);
    
                        const categoria = document.createElement('h7');
                        categoria.id = "categoria";
                        categoria.classList.add("categoria");
                        categoria.innerHTML = jsonresults.resultado.Table[i].CATEGORIA_PROD_TIENDA;
                        segundoDiv.appendChild(categoria);
    
                        productosList.appendChild(productoDiv);
                        //todoList.appendChild(productoDivrow);
                        //todoList.appendChild(segundoDiv);
                }
                
                }
            },
            error: function(error){
                alert(error);
            }      
        })
    });
    const seleccionado = document.querySelector(".productos-list");
    
    seleccionado.addEventListener('click', modal);

    function modal(event){
        const item = event.target;
        console.log(item.parentElement.querySelector(".presentacion").innerHTML);
        document.getElementById('nombremodal').innerHTML = item.parentElement.querySelector(".nombre").innerHTML;
        document.getElementById('preciomodal').innerHTML = item.parentElement.querySelector(".precio").innerHTML;
        document.getElementById('presentacionmodal').innerHTML = item.parentElement.querySelector(".presentacion").innerHTML;
        document.getElementById('categoriamodal').innerHTML = item.parentElement.querySelector(".categoria").innerHTML;
        document.getElementById('descripcionmodal').innerHTML = item.parentElement.querySelector(".descripcion").innerHTML;
        $('#mimodal').modal("show");
    }
});

