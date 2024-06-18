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

    dijkstra(start, end) {
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
        let result = `La distancia de "${this.getElementAt(start).value.name}" a "${this.getElementAt(end).value.name}" es de: ${distanciaTotal}KM`;
        return result;
    }
}