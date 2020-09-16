// Es una aplicacion de codigo abierto, puede ser modificada para tener mejoras
// Programada por Abraham Alejandro Carreón Soriano

// No se pueden importar modulos estando en local.
// Volver a traer todo el codigo a esta hoja.

import {borrarTodo} from './borrar.js';

// Select para agregar las materias 
const selectMaterias = document.getElementById('materia');

const botonEditar = document.getElementById('editar');

// Variables

export const ListaTweets = document.getElementById('lista-tweets');

// La lista de colores para los fondos
const colores = ['#A93226 ', '#CB4335', '#884EA0', '#7D3C98', '#2471A3', '#2E86C1', '#17A589', '#138D75', '#229954', '#28B463', '#D4AC0D', '#D68910', '#839192', '#707B7C', '#ECD078', '#D95B43', '#C02942', '#542437', '#53777A', '#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'];

// Events listeners


eventListener();

function eventListener()
{
    // Reedirecciona a Github
    document.getElementById('git').addEventListener('click', () => window.open('https://github.com/Abraham-Carreon/Organizador-de-Tareas'));

    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    // Cuando envia el formulario elimina su contenido 
    document.querySelector('#formulario').addEventListener('submit',eliminarCont);

    // Editar la tarea

    ListaTweets.addEventListener('click', editarTarea);

    // Borra las tareas
    ListaTweets.addEventListener('click', borrarTweet);

    document.querySelector('#basura').addEventListener('click',borrarTodo);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

    // Editar las materias
    botonEditar.addEventListener('click', editarMaterias);
    
    // Agrega las materias al DOM
    document.addEventListener('DOMContentLoaded', insertarMaterias);

    
    // Agregar materias
    document.querySelector('#agregar-mat').addEventListener('click', agregarMateria);


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
    return Math.round(Math.random() * (colores.length -1) );
}


// El boton para agregar mas materias 
function agregarMateria(e)
{
    e.preventDefault();
    // Variables 
    const cuadroAgregar = document.querySelector('#agregar-materias');
    const cuadroMateria = document.createElement('textarea');
    const botonAgregarMat =  document.querySelector('#agregar-mat'); 
    const nuevoBoton = document.createElement('a');
    
 
     // Es la referencia para agregar el nuevo boton
   const referencia = botonAgregarMat.parentNode;

   // El boton principal se quita 
   botonAgregarMat.style.display = 'none';
    // Estilos del nuevo boton
   nuevoBoton.textContent = 'Agregar';
   nuevoBoton.className = 'botones';
   nuevoBoton.id = 'agregar-mat';
   nuevoBoton.title = 'Presiona para agregar';
   nuevoBoton.style.backgroundColor = '#cb0000';
   // Se inserta el nuevo boton
   referencia.insertBefore(nuevoBoton,botonAgregarMat);
   document.querySelector('body').title = 'Presiona el boton rojo para agregar la materia';

   // Estilos y definicion del textarea para la materia
   cuadroMateria.style.height = 'auto';
   cuadroMateria.style.display = 'inline-block';
   cuadroMateria.className = 'u-full-width';
   cuadroMateria.title = 'Agrega la materia deseada';
   cuadroMateria.placeholder = 'Ingresa la materia';
   
   // Agrega el cuadro para agregar la materia
   cuadroAgregar.appendChild(cuadroMateria);     
    
    nuevoBoton.addEventListener('click', (e) =>
    {
       e.preventDefault();

       const materia = cuadroMateria.value;
       if (materia == '')
       {
        document.querySelector('body').title = '';
        cuadroMateria.remove();
        nuevoBoton.remove()
        botonAgregarMat.style.display = 'inline-block'; 
       }
       else
       {

            agregarMaterias(materia);
            let opcion = document.createElement('option');
            opcion.textContent = materia;
            opcion.value = materia;
            selectMaterias.appendChild(opcion);
            document.querySelector('body').title = '';
            cuadroMateria.remove();
            nuevoBoton.remove()
            botonAgregarMat.style.display = 'inline-block';        
    
       }
    
   
       
    });
 
}


// Seguir modificando para agregar lo demas

function agregarMaterias(materia)
{
    let materias;

    materias = obtenerMaterias();

    // Añadir el nuevo tweet
   // console.log(tweets);
    materias.push(materia);

    // Convertir a arreglo y ponerlo a local storage
    localStorage.setItem('materias', JSON.stringify(materias));

}

// Comprueba que haya elementos en localstorage y retorna un arreglo
function obtenerMaterias()
{
    let tareas;
    
    // revisar lo de local storage

    if ( localStorage.getItem('materias') === null)
    {
        tareas = [];
    }

    else
    {
        tareas = JSON.parse(localStorage.getItem('materias'));
        
    }

    return tareas;
}

// Agrega las materias al DOM
function insertarMaterias()
{
    let materias = obtenerMaterias();

    materias.forEach(materia => 
    {
        // Agrega las materias cuando carga el DOM
        let nombreMateria = materia;
        let opcion = document.createElement('option');
        opcion.textContent = nombreMateria;
        opcion.value = nombreMateria;
        selectMaterias.appendChild(opcion);
        
    });

}


function editarMaterias()
{
    const cuadroEditar = document.querySelector('#agregar-materias');
    const lista = document.createElement('ul');
    lista.className = 'contList';
    let materias = obtenerMaterias();
    
    // Revisa que no este creado, para no duplicarlos
    if (cuadroEditar.hasChildNodes())
    {
        // No hace nada porque ya esta creado
    }

    else
    {
        materias.forEach(materia =>
            {

                let elemento = document.createElement('li');
                const botonEliminar = document.createElement('a');
                botonEliminar.textContent = ' X';
                botonEliminar.className = 'eliminarMateria';
                botonEliminar.title = `Eliminar ${materia}`;
    
                elemento.className = 'elemList';
                elemento.textContent = materia;
                elemento.appendChild(botonEliminar);
                
                lista.append(elemento);
                cuadroEditar.appendChild(lista);
    
            });

    }  
    
        cuadroEditar.addEventListener('click', eliminarMaterias);

        if (materias.length == 0)
        {
            alert("No existen materias para editar");
        }
        else
        {
             // Los estilos para cambiar el boton para la funcion del doble click
            const boton = document.getElementById('editar');
            const botonAgregar = document.getElementById('editar');
            let ref = botonAgregar.parentNode;
            const botonCerrar = document.createElement('a');
            botonCerrar.id = 'cerrar';
            botonCerrar.style.background = '#cb0000';
            botonCerrar.style.fontWeight = 'bolder';
            botonCerrar.title = 'Click para cerrar';
            botonCerrar.textContent = 'Cerrar';
            ref.insertBefore(botonCerrar, botonAgregar);
            boton.style.display = 'none';
            
            botonCerrar.addEventListener('click', () =>
            {
                boton.title = 'Eliminar alguna materia';
                boton.style.display = 'inline-block';   
                botonCerrar.remove();
                lista.remove()
                
            }); 
        }
      


        
    
}

function borrarLocalStorageMaterias(materia)
{
    let materias, materiaEliminar;

    // Recorta el principio de la palabra y la guarda en la variable
    materiaEliminar = materia.substring(0, materia.length -2); 
    
    materias = obtenerMaterias();
    
    materias.forEach(function(materia, i)
    {
        if (materiaEliminar === materia )
        {
            // Elimina el valor del arreglo, el primer parametro es la posicion del arreglo y el segundo es los valores que se van a eliminar
            materias.splice(i, 1);
        }
    });
    // Modifica el local storage con los nuevos elementos

    localStorage.setItem('materias', JSON.stringify(materias));
    location.reload();
  
}
 

function eliminarMaterias(e)
{
    e.preventDefault();

    if (e.target.className == 'eliminarMateria')
    {
        let materia = e.target.parentElement.textContent;
        let nuemateria = materia.substring(0, materia.length -2);
        let decision = confirm(`Deseas eliminar la materia ${nuemateria}`);
        if (decision)
        {
            borrarLocalStorageMaterias(e.target.parentElement.textContent);
        }

    }  
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
     Alerta.textContent = 'Ingresa alguna tarea al formulario';   

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
        const editar = document.createElement('img');

        // Propiedades de la imagen
        editar.src = '/assets/img/editar.png';
        editar.title = 'Editar la tarea';
        editar.className = 'editarIco';

        // Agrega el color a la barra
        barra.style.backgroundColor = color;
        barra.textContent = datos.materia;
        barra.className = 'materia';
        barra.appendChild(editar);
    
        const li = document.createElement('li');
        li.className = 'tarea';
        li.textContent = datos.tarea;
        // Añade el boton de borrar al tweet
        li.appendChild(boton);
        // Añade ls tarea a la lista
        lista.appendChild(barra);
        lista.appendChild(li);
        ListaTweets.appendChild(lista);
        
    

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

// Edita las tareas ya agregadas

function editarTarea(e)
{
    e.preventDefault();
    // Sirve para agregar la tarea a editar al form de agregar
    

    if (e.target.className == 'editarIco')
    {
        // Traversing a la tarea
        //console.log(e.target.parentElement.nextSibling);   

        // Guarda la tarea del click
        let tarea = e.target.parentElement.nextSibling.textContent;
        // Guarda la tarea para pasarla al input(elimina la X de eliminar)
        const tareaEditar = tarea.substring(0, tarea.length -1 );
        // Obtiene en formulario 
        let formTarea = document.getElementById('tweet');
        // Pone la tarea en el formulario
        formTarea.value = tareaEditar;
        
        // Elimina de la lista la materia y tarea
        e.target.parentElement.parentElement.remove();
        e.target.parentElement.remove();

        // Borra la tarea del localStorage
        borrarLocalStorage(tarea);

    }
    

}




