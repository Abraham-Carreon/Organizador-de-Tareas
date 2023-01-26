import {
    selectMaterias
} from './app.js';
import {
    borrarLocalStorage
} from './tareas.js';
// El boton para agregar mas materias 
export function agregarMateria(e) {
    e.preventDefault();
    // Variables 
    const cuadroAgregar = document.querySelector('#agregar-materias');
    const cuadroMateria = document.createElement('textarea');
    const botonAgregarMat = document.querySelector('#agregar-mat');
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
    referencia.insertBefore(nuevoBoton, botonAgregarMat);
    document.querySelector('body').title = 'Presiona el boton rojo para agregar la materia';

    // Estilos y definicion del textarea para la materia
    cuadroMateria.style.height = 'auto';
    cuadroMateria.style.display = 'inline-block';
    cuadroMateria.className = 'u-full-width';
    cuadroMateria.title = 'Agrega la materia deseada';
    cuadroMateria.placeholder = 'Ingresa la materia';

    // Agrega el cuadro para agregar la materia
    cuadroAgregar.appendChild(cuadroMateria);

    nuevoBoton.addEventListener('click', (e) => {
        e.preventDefault();

        const materia = cuadroMateria.value;
        if (materia == '') {
            document.querySelector('body').title = '';
            cuadroMateria.remove();
            nuevoBoton.remove()
            botonAgregarMat.style.display = 'inline-block';
        } else {

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

export function agregarMaterias(materia) {
    let materias;

    materias = obtenerMaterias();

    // Añade la nueva materia
    materias.push(materia);

    // Convertir a arreglo y ponerlo a local storage
    localStorage.setItem('materias', JSON.stringify(materias));

}

// Comprueba que haya elementos en localstorage y retorna un arreglo
export function obtenerMaterias() {
    let tareas;

    // revisar lo de local storage

    if (localStorage.getItem('materias') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('materias'));

    }

    return tareas;
}

// Agrega las materias al DOM
export function insertarMaterias() {
    let materias = obtenerMaterias();

    materias.forEach(materia => {
        // Agrega las materias cuando carga el DOM
        let nombreMateria = materia;
        let opcion = document.createElement('option');
        opcion.textContent = nombreMateria;
        opcion.value = nombreMateria;
        selectMaterias.appendChild(opcion);
    });

}

export function editarMaterias() {
    const cuadroEditar = document.querySelector('#agregar-materias');
    const lista = document.createElement('ul');
    lista.className = 'contList';
    let materias = obtenerMaterias();

    // Revisa que no este creado, para no duplicarlos
    if (cuadroEditar.hasChildNodes()) {
        // No hace nada porque ya esta creado
    } else {
        materias.forEach(materia => {

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

    if (materias.length == 0) {
        alert("No existen materias para editar");
    } else {
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

        botonCerrar.addEventListener('click', () => {
            boton.title = 'Eliminar alguna materia';
            boton.style.display = 'inline-block';
            botonCerrar.remove();
            lista.remove()

        });
    }
}

export function borrarLocalStorageMaterias(materia) {
    let materias, materiaEliminar;

    // Recorta el principio de la palabra y la guarda en la variable
    materiaEliminar = materia.substring(0, materia.length - 2);

    materias = obtenerMaterias();

    materias.forEach(function (materia, i) {
        if (materiaEliminar === materia) {
            // Elimina el valor del arreglo, el primer parametro es la posicion del arreglo y el segundo es los valores que se van a eliminar
            materias.splice(i, 1);
        }
    });

    // Modifica el local storage con los nuevos elementos

    localStorage.setItem('materias', JSON.stringify(materias));
    location.reload();
}

export function eliminarMaterias(e) {
    e.preventDefault();

    if (e.target.className == 'eliminarMateria') {
        let materia = e.target.parentElement.textContent;
        let nuemateria = materia.substring(0, materia.length - 2);
        let decision = confirm(`Deseas eliminar la materia ${nuemateria}`);
        if (decision) {
            borrarLocalStorageMaterias(e.target.parentElement.textContent);
        }
    }
}

// Eliminar contenido del formulario despues de hacer click 

export function eliminarCont(tarea) {
    tarea.preventDefault();
    // Podrias ponerla en la funcion de agregartweet
    // Solo funciona value, textcontent no lo hace
    document.getElementById('tweet').value = "";
}

// Edita las tareas ya agregadas

export function editarTarea(e) {
    e.preventDefault();

    // Sirve para agregar la tarea a editar al form de agregar
    if (e.target.className == 'editarIco') {
        // Traversing a la tarea
        //console.log(e.target.parentElement.nextSibling);   
        // Guarda la tarea del click
        let tarea = e.target.parentElement.nextSibling.nextSibling.textContent;
        // Guarda la tarea para pasarla al input(elimina la X de eliminar)
        const tareaEditar = tarea.substring(0, tarea.length - 1);
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

export function desplegar(e) {
    e.preventDefault();
    // Depende de la condicion, despliega o miniminiza la tarea
    let estado = e.target.getAttribute("estado")
    if (estado == '0') {
        e.target.title = "Maximiza la tarea";
        e.target.parentElement.nextSibling.style.display = 'none';
        e.target.parentElement.nextSibling.nextSibling.style.display = 'none';
        e.target.classList.remove('minimizar');
        e.target.classList.add('maximizar');
        e.target.setAttribute("estado", 1);
    } else if (estado == '1') {
        e.target.title = "Minimiza la tarea";
        e.target.parentElement.nextSibling.style.display = 'block';
        e.target.parentElement.nextSibling.nextSibling.style.display = 'block';
        e.target.classList.remove('maximizar');
        e.target.classList.add('minimizar');
        e.target.setAttribute("estado", 0);
    }
}