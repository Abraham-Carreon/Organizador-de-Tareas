// Variables

const ListaTweets = document.getElementById('lista-tweets');

const colores = ['#A93226 ', '#CB4335', '#884EA0', '#7D3C98', '#2471A3', '#2E86C1', '#17A589', '#138D75', '#229954', '#28B463', '#D4AC0D', '#D68910', '#839192', '#707B7C'];


// Events listeners

eventListener();

function eventListener()
{
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    // Cuando envia el formulario elimina su contenido 
    document.querySelector('#formulario').addEventListener('submit', eliminarCont);
    // Borra las tareas
    ListaTweets.addEventListener('click',borrarTweet);

    document.querySelector('#basura').addEventListener('click', borrarTodo);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded',localStorageListo);
}


// Funcion

// Tweet del formulario

class Tarea
{
    constructor(tarea,materia, color)
    {
        this.tarea = tarea;
        this.materia = materia;
        this.color = color;
    }
}

function numeroAleatorio()
{
    return Math.round(Math.random() * colores.length);
}

function agregarTweet(e)
{
    e.preventDefault();
    // Leer el valor 
    // Genera un numero en aleatorio para el color
    const color = colores[ numeroAleatorio()];

    const tweet = document.getElementById('tweet').value;
    const materia = document.getElementById('materia').value;
    
    const datos = new Tarea(tweet, materia, color);

    // Las alertas en caso de que no haya mensaje
    const contAlert = document.getElementById('contAlert');
    const Alerta = document.createElement('p');

    if (tweet == '')
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
     Alerta.textContent = 'Ingresa alguna tarea a la casilla';
    
     // Agregar estilos
     
     Alerta.style.fontFamily = 'Arial';
     Alerta.style.fontSize = '1.2em';
     Alerta.style.textAlign = 'center';
     Alerta.style.color = 'black';
     Alerta.style.fontWeight = 'bolder';
     Alerta.style.backgroundColor = '#E32636';
     Alerta.style.border = 'black 5px';
     Alerta.style.borderStyle = 'solid';
     
   
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


   
    // crear elemento y agregar a la lista

        // Crea la barra de las materias

        const lista = document.createElement('ul');
        const barra = document.createElement('li');
        // Agrega el color a la barra
        barra.style.backgroundColor = color;
        barra.textContent = datos.materia;
        barra.className = 'materia';
    
        const li = document.createElement('li');
        li.className = 'tarea';
        li.textContent = datos.tarea;
        // Añade el boton de borrar al tweet
        li.appendChild(boton);
        // Añade el tweet a la lista
        lista.appendChild(barra);
        lista.appendChild(li);
    
        ListaTweets.appendChild(lista);
        //ListaTweets.appendChild(barra);
        //ListaTweets.appendChild(li);
    

  // Agregar a local storage

    agregarLocalStorage(datos);

    }

    
   
}

// Eliminar contenido del formulario despues de hacer click 

function eliminarCont(tarea)
{
    tarea.preventDefault();
    // Podrias ponerla en la funcion de agregartweet
    // Solo funciona value, textcontent no lo hace
    document.getElementById('tweet').value = "";
}

// Elimina el tweet del DOM
function borrarTweet(e)
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

   // console.log("Diste click en la lista");

}

// Mostrar los datos de local storage
function localStorageListo()
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
        // Agrega el color a la barra
        barra.style.backgroundColor = tarea.color;
        barra.textContent = tarea.materia;
        barra.className = 'materia';

        const li = document.createElement('li');
        li.textContent = tarea.tarea;
        li.className = 'tarea';
        // Añade el boton de borrar al tweet
        li.appendChild(boton);


        // Añade el tweet a la lista
        lista.appendChild(barra);
        lista.appendChild(li);
    
        ListaTweets.appendChild(lista);
        
        //ListaTweets.appendChild(barra);
        //ListaTweets.appendChild(li);

    });
}



// Agrega el tweet al localstorage

function agregarLocalStorage(tweet)
{
    let tweets;

    tweets = obtenertweets();

    // Añadir el nuevo tweet
   // console.log(tweets);
    tweets.push(tweet);

    // Convertir a arreglo y ponerlo a local storage
    localStorage.setItem('tarea', JSON.stringify(tweets));

}

// Comprueba que haya elementos en localstorage y retorna un arreglo
function obtenertweets()
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

function borrarLocalStorage(tarea)
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
function borrarTodo(e)
{
    e.preventDefault();
    

    // Se puede hacer algo parecido a esto para eliminar todo

    /* 
function removeAllChilds(a)
 {
 var a=document.getElementById(a);
 while(a.hasChildNodes())
	a.removeChild(a.firstChild);	
 }
 removeAllChilds('a');
    
    */

    // Confirmar que se quiere eliminar todo


    let borrar = confirm('¿Deseas eliminar todas las tareas?');
    
    if (borrar)
    {
        ListaTweets.innerHTML = '';
        localStorage.clear(); 
    }
   
}
