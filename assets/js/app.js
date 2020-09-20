// Es una aplicacion de codigo abierto, puede ser modificada para tener mejoras
// Programada por Abraham Alejandro Carreón Soriano

// Importa las funciones de los demas archivos
import * as tareas from './tareas.js';
import * as func from './funciones.js';

// Select para agregar las materias 
export const selectMaterias = document.getElementById('materia');

const botonEditar = document.getElementById('editar');

// Variables

export const ListaTweets = document.getElementById('lista-tweets');

// La lista de colores para los fondos
export const colores = ['#A93226 ', '#CB4335', '#884EA0', '#7D3C98', '#2471A3', '#2E86C1', '#17A589', '#138D75', '#229954', '#28B463', '#D4AC0D', '#D68910', '#839192', '#707B7C', '#AAEB79', '#7EE6E6', '#818DE3', '#FF6565', '#D95B43', '#C02942', '#542437', '#53777A', '#556270', '#4ECDC4', '#FF6B6B', '#C44D58'];

// Events listeners


eventListener();

function eventListener()
{
    // Reedirecciona a Github
    document.getElementById('git').addEventListener('click', () => window.open('https://github.com/Abraham-Carreon/Organizador-de-Tareas'));

    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', tareas.agregarTweet);
    // Cuando envia el formulario elimina su contenido 
    document.querySelector('#formulario').addEventListener('submit', func.eliminarCont);

    // Editar la tarea

    ListaTweets.addEventListener('click', func.editarTarea);

    // Desplegar o minimizar la tarea

    ListaTweets.addEventListener('click', func.desplegar);

    // Borra las tareas
    ListaTweets.addEventListener('click', tareas.borrarTweet);

    document.querySelector('#basura').addEventListener('click', tareas.borrarTodo);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', tareas.localStorageListo);

    // Editar las materias
    botonEditar.addEventListener('click', func.editarMaterias);
    
    // Agrega las materias al DOM
    document.addEventListener('DOMContentLoaded', func.insertarMaterias);

    
    // Agregar materias
    document.querySelector('#agregar-mat').addEventListener('click', func.agregarMateria);

    // Editar tareas

    ListaTweets.addEventListener('click', func.editarTarea);

}

// Funcion

// Tweet del formulario
export class Tarea
{
    constructor(tarea,materia, color)
    {
        this.tarea = tarea;
        this.materia = materia;
        this.color = color;
    }
}

export function numeroAleatorio()
{    
    return Math.round(Math.random() * (colores.length -1) );
}


