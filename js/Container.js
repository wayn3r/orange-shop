class Container {
    /**  @property {Array} */
    #content
    /**  @property {Number} */
    #key
    /** @property {Number} */
    #amount
     /**  @property {String[]} */
    #filledWith
    constructor(key, amount) {
        this.#key = key
        this.#amount = amount
        this.#content = []
        this.#filledWith = []
    }
    fillWith(fruit) {
        this.#filledWith.push(fruit)
        this.#content = [...Array(this.#amount)].map(
            (_, key) => `${fruit} no.${key + 1} from container ${this.#key}`,
        )
    }
    emptyPositions() {
        return this.#amount - this.#content.length
    }
    has() {
        return this.#content.length
    }
    isEmpty() {
        return this.has() === 0
    }
    hasBeenFilledWith(fruit) {
        return this.#filledWith.includes(fruit)
    }
    pullOut(amount) {
        return this.#content.splice(0, amount)
    }

    pushIn(fruits) {
        fruits.forEach(fruit => {
            if (this.has() + 1 > this.#amount) {
                throw new Error('Container is full')
            }
            this.#content.push(fruit)
        })
    }
}
