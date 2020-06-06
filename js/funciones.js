var http= new XMLHttpRequest();
var btnAlta;
var divFrm;
var frm;
var divInfo;
var btnCancelar;

var lista;

window.onload= inicializar;

    function inicializar()
    {
        // var btn= document.getElementById("btnEnviar");
        // btn.onclick= login;

        http.onreadystatechange= callback;

        document.getElementById('btnAlta').addEventListener('click',crearFormulario);
        
        traerPersonas();

    }

    var xhr;
    function traerPersonas() 
    {
        var url = "http://localhost:3000/autos"
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = traerManejador;
        xhr.open('GET',url,true);
        xhr.send();
    }

    function callback(){
        console.log("Llego respuesta", http.readyState);
    
        if(http.readyState===4 && http.status===200){
        
            console.log("tenemos un 200");

            //document.write(http.responseText);
            // if(http.responseText){
            //     alert("Login ok");
            // }else{
            //     alert("Error!");
            // }
        }else{
            console.log("Tenemos un error!"); 
        }
        console.log("Termino llamada");
    }

    function traerManejador()
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
            document.getElementById('spinner').style.display = 'none';
            var lista = JSON.parse(xhr.responseText);
            //console.log(lista);
            crearTabla(lista);
            }
            else
            {
            //alert("Error: " + xhr.status + " - " + xhr.statusText);
            }
        }
        else
        {
            document.getElementById('spinner').style.display = 'block';    
        }
    }

    function postManejador()
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
                document.getElementById('spinner').style.display = 'none';
                
                actualizarTabla(JSON.parse(xhr.responseText));
            }
            else
            {
                //alert("Error: " + xhr.status + " - " + xhr.statusText);
            }
        }
        else
        {
            document.getElementById('spinner').style.display = 'block';    
        }
    }

    function crearHeader(tabla, lista)
    {
        var header = document.createElement('tr');
        var theader = document.createElement('thead');
        theader.id = 'theader';
        
        for(atributo in lista[0])
        {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(atributo));
            header.appendChild(th);
            if(atributo=== "id"){
                th.style.display = 'none';
            }
        }
        theader.appendChild(header);
        tabla.appendChild(theader);
        return crearBody(tabla,lista);

    }

    function crearBody(tabla,lista)
    {
        var tbody = document.createElement('tbody');
        tbody.id = 'bodyTabla';
        for(var i = 0; i < lista.length; i++)
        {
            var tr = document.createElement('tr');
            var atributo;
            for(atributo in lista[i])
            {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(lista[i][atributo]));
                tr.appendChild(td);
                if(atributo=== "id"){
                    td.style.display = 'none';
                }
            }
            tr.id = 'tableRow';
            tr.addEventListener('click',crearFormulario);
            tbody.appendChild(tr);
        }
        tabla.appendChild(tbody);
        return tabla;
    }

    function crearTabla(lista) 
    {
        var tabla = document.createElement('table');
        tabla.id = "tablaLista";
        tabla = crearHeader(tabla, lista);
        document.body.appendChild(tabla);
    }

    function actualizarTabla(respuesta)
    {
        var tbody;
        tbody= document.getElementById('bodyTabla');

        var tr = document.createElement('tr');
        var atributo;
        for(atributo in respuesta)
        {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(respuesta[atributo]));
            tr.appendChild(td);
            if(atributo=== "id"){
                td.style.display = 'none';
            }
        }
        tr.id = 'tableRow';
        tr.addEventListener('click',crearFormulario);
        tbody.appendChild(tr);
    }

    function consultarFormExistente()
    {
        for(hijos of document.body.children)
        {
            if(hijos.className == 'frm')
            {
                return 0;
            }
        }
    }

    function crearFormulario()
    {
        var formulario = document.createElement('form');
        formulario.className = 'contenedor';
        var tabla = document.createElement('table');
        var header = document.getElementById('theader');
        var i;
        for(i = 0; i< header.children[0].children.length; i++)
        {
            var tr = document.createElement('tr');
            var label = document.createElement('label');
            label.className = 'labelForm';
            label.innerText = header.children[0].children[i].innerText;

            var td = document.createElement('td');
            td.appendChild(label);
            tr.appendChild(td);

            var td = document.createElement('td');
            
            if(header.children[0].children[i].innerText == 'id')
            {
                tr.style.display = 'none';
            }
            if(header.children[0].children[i].innerText == 'make')
            {
                td.appendChild(crearInputText());
            }
            if(header.children[0].children[i].innerText == 'model')
            {
                td.appendChild(crearInputText());
            }
            if(header.children[0].children[i].innerText == 'year')
            {
                td.appendChild(crearSelect(this));
            }

            tr.appendChild(td);
            tabla.appendChild(tr);
        }
        
        agregarBotonesRow(tabla,this);
        agregarBotonEnviar(tabla,this);
        formulario.appendChild(tabla);
        document.body.appendChild(formulario);
    }

    function crearSelect(caller)
    {
        // var labelValor = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
         
        var yearSelect = document.createElement('select');
        yearSelect.className = 'inputForm';
        yearSelect.id = 'yearSelect';

        for(var i=2000; i<2021; i++)
        {
            var option = document.createElement('option');
            // option.className = 'labelForm';
            option.innerText = i;
            
            // obtenerValorSelect(caller);
            yearSelect.appendChild(option);
        }
        
        return yearSelect;
    }

    function obtenerValorSelect()
    {
        
        var year = document.getElementById('yearSelect');
        var index;
        var yearSelected;

        index = year.selectedIndex;

        yearSelected= year.options[index].innerText;
           
        return yearSelected;
    }

    function crearInputText()
    {
        var input;
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'inputForm';

        return input;
    }

    function agregarBotonEnviar(tabla,caller)
    {
        if(caller.id == 'btnAlta')
        {
            var tr = document.createElement('tr');
            var Enviar = document.createElement('button');
            Enviar.innerText = 'Guardar';
            Enviar.type = 'button';
            Enviar.classList.add('btnForm');
            Enviar.classList.add('btnGuardar');
            Enviar.addEventListener('click',altaPersona);
            var td = document.createElement('td');
            td.appendChild(Enviar);
            tr.appendChild(td);
            agregarBotonCancelar(tabla,tr);
            tabla.appendChild(tr);
        }
    }

    function agregarBotonesRow(tabla, caller)
    {
        if(caller.id == 'tableRow')
        {
            var botones = ["Eliminar","Modificar","Cancelar"];
            var tr = document.createElement('tr');

            for(var i = 0 ; i<botones.length;i++)
            {
                var boton = document.createElement('button');
                boton.innerText = botones[i];
                boton.type = 'button';
                boton.className = 'btnForm';
                if(i == 0)
                {
                    boton.addEventListener('click',eliminacionPersona);
                }
                else if(i==1)
                {
                    boton.addEventListener('click',modificacionPersona);
                }
                else
                {
                    boton.addEventListener('click',cerrarForm);
                }
                var td = document.createElement('td');
                td.appendChild(boton);
                tr.appendChild(td);
            }

            tabla.appendChild(tr);
        }
    }

    function agregarBotonCancelar(tabla,tr)
    {
        var Cancelar = document.createElement('button');
        Cancelar.innerText = 'Cancelar';
        Cancelar.type = 'button';
        Cancelar.classList.add('btnForm');
        Cancelar.classList.add('btnCancelar');
        Cancelar.addEventListener('click',cerrarForm);
        var td = document.createElement('td');
        td.appendChild(Cancelar);
        tr.appendChild(td);
    }


    function altaPersona() 
    {
        var inputs = document.getElementsByClassName('inputForm');

        var year= obtenerValorSelect();
    
        var nuevaPersona = new Persona(inputs[0].value, inputs[1].value, year);
        guardarPersona(nuevaPersona);
        removerObjetos();
    }

    function eliminacionPersona() 
    {
        var inputs = document.getElementsByClassName('inputForm');
        if(confirm("¿Desea eliminar a " + inputs[1].value +", " +inputs[2].value+"?"))
        {
            bajaPersona(inputs[0].value);
            removerObjetos();        
        }
    }


    function cerrarForm()
    {
        document.body.removeChild(document.getElementsByClassName('contenedor')[0]);
    }

    function removerObjetos()
    {
        cerrarForm();
        // document.body.removeChild(document.getElementById('tablaLista'));    
    }

    function eliminacionPersona() 
    {
        var inputs = document.getElementsByClassName('inputForm');
        if(confirm("¿Desea eliminar a " + inputs[1].value +", " +inputs[2].value+"?"))
        {
            bajaPersona(inputs[0].value);
            removerObjetos();        
        }
    }

    function modificacionPersona(persona) 
    {
        var turno = document.getElementById('turno');

        if (turno.checked == true){
            turno=true;
        }else{
            turno=false;
        }

        var casa;
        if (document.getElementById('Mañana').checked) {
            casa = "Mañana";
        }
        else if (document.getElementById('Tarde').checked) {
            casa = "Tarde";
        }

        var inputs = document.getElementsByClassName('inputForm');
        var persona = new Persona(inputs[1].value,inputs[2].value,inputs[3].value,casa, turno);
        persona.id = inputs[0].value;
        modificarPersona(persona);
        removerObjetos();
    }

    function Persona(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    function guardarPersona(persona) 
    {
        var body=
        {
            'make':persona.make,
            'model':persona.model,
            'year':persona.year
        };
        
        var url = "http://localhost:3000/nuevoAuto";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    function bajaPersona(id) 
    {
        var body=
        {
            'id':id
        }
        var url = "http://localhost:3000/eliminar";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    function modificarPersona(persona) 
    {
        var body=
        {
            'objeto':persona
        }
        var url = "http://localhost:3000/editar";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    // function ejecutarPost(){

    //     var httpPost= new XMLHttpRequest();

    //     httpPost.onreadystatechange= function(){

    //         if(httpPost.readyState===4 && httpPost.status===200){

    //             alert(httpPost.responseText);
    //         }

    //         httpPost.open("POST","http://localhost:3000/nuevapersona", true);
    //         httpPost.setRequestHeader("Content-Type","application/json");//para saber que va a viajar en el body, en este caso json
    //         var json= '{"nombre":"Mercedes","apellido":"Guerrero","fecha":"2019-05-01","telefono":463782991}'
    //         httpPost.send(JSON.stringify(json));

    //     }
    // }
