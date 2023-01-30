import {ListaTweets, Tarea, numeroAleatorio, colores}  from './app.js';


export function agregarTweet(e)
{
    e.preventDefault();
    // Leer el valor 
    // Genera un numero en aleatorio para el color
    const color = colores[ numeroAleatorio()];

    const tweet = document.getElementById('tweet').value;
    const materia = document.getElementById('materia').value;
    let fecha = document.getElementById("fechaEntrega").value;
    
    //Se obtiene la fecha del formulario o se agrega la de hoy por defecto, una parte se obtuvo por chatgpt
    fecha == "" ?  fecha = `${String(new Date().getDate()).padStart(2, '0')} - ${new Date().getMonth()+1} - ${new Date().getFullYear()}`: fecha=`${String(new Date(fecha).getDate()+1).padStart(0, '0')} - ${String(new Date(fecha).getMonth() + 1).padStart(2, '0')} - ${new Date(fecha).getFullYear()}`;
    const datos = new Tarea(tweet, materia, fecha, color, 0);
    // Las alertas en caso de que no haya mensaje
    const contAlert = document.getElementById('contAlert');
    const Alerta = document.createElement('p');
    
    if (tweet == '' || materia == '')
    {

        if (document.querySelector('#alerta'))
        {
            // Ya esta agregada la alerta de que no se ha escrito nada
            // Si no la crea en el "else"
            contAlert.style.display = 'block';
        }

        else
        {
            // Crea un contenedor y un parrafo para alertas
            Alerta.id = 'alerta';
            Alerta.textContent = 'No se ingreso ninguna tarea o no existen materias.';

            // Agrega la alerta a el area del DOM
            contAlert.appendChild(Alerta);
        }
    }

    else
    {

        // Elimina la alerta si estaba
        contAlert.style.display = 'none'; 
    
        // Crear boton de eliminar
    
        const boton = document.createElement('a');
        boton.classList = 'borrar-tweet';
        boton.textContent = 'X'; 

        // Crear elemento y agregar a la lista

        // Crea la barra de las materias

        const lista = document.createElement('ul');
        const barra = document.createElement('li');
        const editar = document.createElement('img');
        const minimizar = document.createElement('img');

        // Propiedades de la imagen
        editar.src = './assets/img/editar.png';
        editar.title = 'Editar la tarea';
        editar.className = 'editarIco';

        // Propiedades de la imagen
        minimizar.src = './assets/img/triangulo.png'        
        minimizar.setAttribute("estado", datos.estado);        

        // Agrega el color a la barra
        barra.style.backgroundColor = color;
        barra.textContent = datos.materia;
        barra.className = 'materia';
        barra.appendChild(editar);
        barra.appendChild(minimizar);

        // Crea el apartado de la fecha
        const lf = document.createElement('li');
        lf.className = "tarea";
        lf.textContent = datos.fecha;
        lf.classList.add("hora");

        const li = document.createElement('li');
        li.className = 'tarea';
        li.textContent = datos.tarea;
        // Añade el boton de borrar al tweet
        li.appendChild(boton);

        if (datos.estado == '0') {
            minimizar.title = "Maximiza la tarea";
            li.style.display = "none";
            lf.style.display = "none";
            minimizar.classList.remove('minimizar');
            minimizar.classList.add('maximizar');
            minimizar.setAttribute("estado", 1);
        } else if (datos.estado == '1') {
            minimizar.title = "Minimiza la tarea";
            li.style.display = "block";
            lf.style.display = "block";           
            minimizar.classList.remove('maximizar');
            minimizar.classList.add('minimizar');
            minimizar.setAttribute("estado", 0);
        }

        // Añade ls tarea a la lista
        lista.appendChild(barra);
        lista.appendChild(lf);
        lista.appendChild(li);
        ListaTweets.appendChild(lista);
            
        // Agregar a local storage

        agregarLocalStorage(datos);   
    }
}


// Elimina la tarea del DOM
export function borrarTweet(e)
{
    e.preventDefault();

    if ( e.target.className === 'borrar-tweet')
    {
        // Elimina la parte de borrar-tweet
        // Elimina la materia y la tarea
        e.target.parentElement.parentElement.remove();
        e.target.parentElement.remove();
        
        borrarLocalStorage(e.target.parentElement.textContent);
    }
}

// Mostrar los datos de local storage
export function localStorageListo()
{
    let tareas;

    tareas = obtenertweets();

    tareas.forEach(function(tarea) 
    {
        const boton = document.createElement('a');
        boton.classList = 'borrar-tweet';
        boton.textContent = 'X'; 
        
        // crear elemento y agregar a la lista
        const lista = document.createElement('ul');
        const barra = document.createElement('li');
        const editar = document.createElement('img');
        const minimizar = document.createElement('img');

        // Propiedades de la imagen
        editar.src = './assets/img/editar.png';
        editar.title = 'Editar la tarea';
        editar.className = 'editarIco';

        // Propiedades de la imagen
        minimizar.src = './assets/img/triangulo.png'       
        
        // Agrega el color a la barra
        barra.style.backgroundColor = tarea.color;
        barra.textContent = tarea.materia;
        barra.className = 'materia';
        barra.appendChild(editar);
        barra.appendChild(minimizar);

        const li = document.createElement('li');
        li.textContent = tarea.tarea;
        li.className = 'tarea';

        const lf = document.createElement('li');
        lf.textContent = tarea.fecha;
        lf.className = 'tarea';
        lf.classList.add("hora");
        // Añade el boton de borrar al tweet
        li.appendChild(boton);

        if (tarea.estado == '0') {
            minimizar.title = "Maximiza la tarea";
            li.style.display = "none";
            lf.style.display = "none";
            minimizar.classList.remove('minimizar');
            minimizar.classList.add('maximizar');
            minimizar.setAttribute("estado", 1);
        } else if (tarea.estado == '1') {
            minimizar.title = "Minimiza la tarea";
            li.style.display = "block";
            lf.style.display = "block";     
            minimizar.classList.remove('maximizar');
            minimizar.classList.add('minimizar');
            minimizar.setAttribute("estado", 0);
        }

        // Añade el tweet a la lista
        lista.appendChild(barra);
        lista.appendChild(lf);
        lista.appendChild(li);
        ListaTweets.appendChild(lista);                
    })
}

// Agrega el tweet al localstorage

export function agregarLocalStorage(tweet)
{
    let tweets;

    tweets = obtenertweets();

    // Añade la nueva tarea
    tweets.push(tweet);

    // Convertir a arreglo y ponerlo a local storage
    localStorage.setItem('tarea', JSON.stringify(tweets));
}

// Comprueba que haya elementos en localstorage y retorna un arreglo
export function obtenertweets()
{
    let tweets;

    // revisar lo de local storage

    if ( localStorage.getItem('tarea') === null)
    {
        tweets = [];
    }

    else
    {
        tweets = JSON.parse(localStorage.getItem('tarea'));
    }

    return tweets;
}

// Elimina el tweet de local Storage

export function borrarLocalStorage(tarea)
{
    let tareas, tareaEliminar;

    // Recorta el principio de la palabra y la guarda en la variable
    tareaEliminar = tarea.substring(0, tarea.length -1); 
    
    tareas = obtenertweets();

    tareas.forEach(function(tarea, i)
    {
        if (tareaEliminar === tarea.tarea )
        {
            // Elimina el valor del arreglo, el primer parametro es la posicion del arreglo y el segundo es los valores que se van a eliminar
            tareas.splice(i, 1);
        }
    });

    // Modifica el local storage con los nuevos elementos
    localStorage.setItem('tarea', JSON.stringify(tareas));

}

// Borra todas las tareas
export function borrarTodo(e)
{
    e.preventDefault();

    let borrar = confirm('¿Deseas eliminar todas las tareas?');
    
    if (borrar)
    {
        ListaTweets.innerHTML = '';        
        localStorage.removeItem('tarea');
    }
}
