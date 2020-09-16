import {ListaTweets}  from './app.js';

// Borra todas las tareas
export function borrarTodo(e)
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
        //localStorage.clear(); 
        localStorage.removeItem('tarea');
    }
   
}
