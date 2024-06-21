let currentId = 0

export default class Ubicacion {
    constructor(name) {
        this.name = name;
        this.id = currentId++;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}
