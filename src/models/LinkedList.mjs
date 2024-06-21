import Node from "./Node.mjs";

export default class LinkedList {
  #head;
  #count;
  adjacencyMatrix;

  constructor() {
    this.#head = null;
    this.#count = 0;
    this.adjacencyMatrix = [];
  }

  add(value) {
    this.adjacencyMatrix.push(new Array(this.adjacencyMatrix.length + 1).fill(0));
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      this.adjacencyMatrix[i].push(0);
    }
    let node = new Node(value);
    if (this.#head == null) {
      this.#head = node;

    } else {
      let current = this.#head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.#count++;
    return true
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this.#count === 0;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return null;
  }

  addEdge(valorOrigen, valorDestino, weight) {
    if (valorOrigen >= 0 && valorOrigen < this.adjacencyMatrix.length && valorDestino >= 0 && valorDestino < this.adjacencyMatrix.length) {
      this.adjacencyMatrix[valorOrigen][valorDestino] = weight;
      this.adjacencyMatrix[valorDestino][valorOrigen] = weight;
      return true;
    }
    return false;
  }
  depthFirstSearch(callback) {
    if (this.#head === null) {
      console.log("La lista está vacía.");
      return;
    }

    let visited = new Array(this.adjacencyMatrix.length).fill(false);
    let stack = [];

    stack.push(0);

    while (stack.length > 0) {
      let index = stack.pop();

      if (!visited[index]) {
        visited[index] = true;
        let node = this.getElementAt(index);

        callback(node.value);

        for (let i = this.adjacencyMatrix.length - 1; i >= 0; i--) {
          if (this.adjacencyMatrix[index][i] != 0 && !visited[i]) {
            stack.push(i);
          }
        }
      }
    }
  }
  /*
  dijkstraOriginal(start, end) {
    if (this.isEmpty()) {
      console.log("La lista está vacía.");
      return;
    }

    const distances = new Array(this.adjacencyMatrix.length).fill(999999);
    const previous = new Array(this.adjacencyMatrix.length).fill(null);
    const queue = [];

    distances[start] = 0;
    queue.push(start);

    while (queue.length > 0) {
      let currentIndex = queue.shift();
      let currentDistance = distances[currentIndex];

      for (let i = 0; i < this.adjacencyMatrix.length; i++) {
        if (this.adjacencyMatrix[currentIndex][i] !== 0 && distances[i] > currentDistance + this.adjacencyMatrix[currentIndex][i]) {
          distances[i] = currentDistance + parseInt(this.adjacencyMatrix[currentIndex][i]);
          previous[i] = currentIndex;
          queue.push(i);
        }
      }
    }

    const distanciaTotal = distances[end];
    let camino = [];
    let currentIndex = end;
    while (currentIndex !== null) {
      camino.unshift(this.getElementAt(currentIndex).value.name);
      currentIndex = previous[currentIndex];
    }

    let result = `La distancia de "${camino[0]}" a "${camino[camino.length - 1]}" es de: ${distanciaTotal}KM.\nLa ruta más corta es: ${camino.join(" -> ")}`;
    return result;
  }
  */
  dijkstra(start, end, callback) {
    let L = [];
    let V = structuredClone(this.adjacencyMatrix);  
    let Lprima = [...Array(this.adjacencyMatrix.length).keys()];
    let D = new Array(this.adjacencyMatrix.length).fill(Infinity);  
    let previous = new Array(this.adjacencyMatrix.length).fill(null);

    
    D[start] = 0;

    // algoritmo Dijkstra
    while (Lprima.length > 0) {
      let minIndex = -1;            //indice de la distancia minima
      let minDistance = Infinity;   //Distancia minima encontrada

      // Encontrar el vértice en Lprima con la menor distancia en D
      for (let i = 0; i < Lprima.length; i++) {
        if (D[Lprima[i]] < minDistance) {
          minDistance = D[Lprima[i]];
          minIndex = i;
        }
      }

      // U es el vertice con distancia minima en D
      let u = Lprima[minIndex];
      L.push(u);
      Lprima.splice(minIndex, 1);

      // Actualizar distancias mínimas a los vértices adyacentes de u
      for (let j = 0; j < this.adjacencyMatrix.length; j++) {
        if (V[u][j] !== 0) {
          if (D[j] > D[u] + parseInt(V[u][j])) {
            D[j] = D[u] + parseInt(V[u][j]);
            previous[j] = u; // Registro del vértice previo
          }
        }
      }
    }
    // Reconstruir la ruta óptima desde el destino hasta el origen
    let path = [];
    let currentVertex = end;
    while (currentVertex !== null) {
      path.unshift(this.getElementAt(currentVertex).value.name);
      currentVertex = previous[currentVertex];
    }

    let resultado = `La distancia de "${path[0]}" a "${path[path.length - 1]}" es de: ${D[end]}KM.\nLa ruta más corta es: ${path.join(" -> ")}`;

    callback(resultado)
  }
}