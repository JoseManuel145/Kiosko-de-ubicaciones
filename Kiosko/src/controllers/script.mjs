import Ubicacion from "../models/Ubicacion.mjs";
import { lista } from "./dependencies.mjs";

let addBtn = document.getElementById("agregarBtn");
let edge = document.getElementById("edgeBtn");
let dfs = document.getElementById("dfsBtn");
let salida = document.getElementById("dfsText");
let dijBtn = document.getElementById("distanciaCorta");

function agregarUbicacionVisual(nombre, id) {
    const ubicacionesDiv = document.getElementById('ubicaciones');
    const ubicacionItem = document.createElement('div');
    ubicacionItem.className = 'ubicacion-item';
    ubicacionItem.innerHTML = `
        <p>ID: ${id}</p>
        <p>Nombre: ${nombre}</p>
    `;
    ubicacionesDiv.appendChild(ubicacionItem);
}

addBtn.addEventListener("click", () => {
    let nombre = document.getElementById("name").value;

    if (!nombre) {
        alert('Por favor, ingresa un nombre.');
        return;
    }

    let ubicacion = new Ubicacion(nombre);

    let verificado = lista.add(ubicacion);

    if (verificado) {
        console.log("correcto");
        alert('Ubicación agregada correctamente.');
        agregarUbicacionVisual(nombre, ubicacion.getId());
    } else {
        console.log("algo falló");
        alert('Algo falló al agregar la ubicación.');
    }

    document.getElementById("name").value = '';
});

edge.addEventListener("click", () => {
    let start = document.getElementById("ubicacion1").value;
    let end = document.getElementById("ubicacion2").value;
    let weight = document.getElementById("distancia").value;

    if (!start || !end || !weight) {
        alert('Por favor, completa todos los campos para agregar una conexión.');
        return;
    }

    let verificadoAux = lista.addEdge(start, end, weight);
    if (verificadoAux) {
        console.log("correcto");
        alert('Conexión agregada correctamente.');
    } else {
        console.log("algo falló");
        alert('Algo falló al agregar la conexión.');
    }

    document.getElementById("ubicacion1").value = '';
    document.getElementById("ubicacion2").value = '';
    document.getElementById("distancia").value = '';
});

dfs.addEventListener("click", () => {
    let dfsResult = "";

    lista.depthFirstSearch((ubicacion) => {
        if (dfsResult !== "") {
            dfsResult += " => ";
        }
        dfsResult += ubicacion.name;
    });

    salida.value = dfsResult;
});

dijBtn.addEventListener("click", () => {
    let dijTxt = document.getElementById("dijTxt");

    let inicio = document.getElementById("inicio").value;
    let destino = document.getElementById("destino").value;

    if (!inicio || !destino) {
        alert('Por favor, ingresa la ciudad actual y la ciudad destino.');
        return;
    }

    let result = lista.dijkstra(inicio, destino);
    dijTxt.value = result;
});
