class ContainerManager {
    /**  @property {Container[]} */
    #containers
    /**  @property {String[]} */
    #fruits
    /**  @property {Array}  */
    #amountPerContainer
    /**  @property {Array} */
    #pricePerFruit
    /** @property {HTMLDivElement} */
    #div
    constructor(containers, amountPerContainer, pricePerFruit, div) {
        this.#amountPerContainer = amountPerContainer
        this.#containers = this.#createContainers(containers)
        this.#pricePerFruit = pricePerFruit
        this.#div = div
    }
    #createContainers(containers) {
        return [...Array(containers)].map((_, key) => {
            const container = new Container(key + 1, this.#amountPerContainer)
            return new Container(key + 1, this.#amountPerContainer)
        })
    }
    // last container would be most to the right
    #getMostToRightContainer() {
        return this.#containers[this.#containers.length - 1]
    }
    #getRandomNumberToSell() {
        return Math.ceil(Math.random() * this.#amountPerContainer)
    }
    fillContainersWith(...fruits) {
        this.#fruits = fruits
        const [firstFruit] = this.#fruits
        this.#containers.forEach(container => container.fillWith(firstFruit))
    }

    sell() {
        const container = this.#getMostToRightContainer()
        const amountRequestedToSell = this.#getRandomNumberToSell()
        let amountToSell = amountRequestedToSell
        if (amountToSell > container.has()) {
            amountToSell = container.has()
        }
        const fruits = container.pullOut(amountToSell)
        const sell = {
            fruits,
            amountRequestedToSell,
            amountSold: amountToSell,
            money: amountToSell * this.#pricePerFruit,
            remain: amountRequestedToSell - amountToSell,
        }
        this.#checkContainers()
        return sell
    }
    renderSell({ fruits, amountRequestedToSell, amountSold, money, remain }) {
        const sellHtml = `
            <div class='sell'>
                <div>
                    <label>Amount Request: <span>${amountRequestedToSell}</span></label>    
                    <label>Amount Sold: <span>${amountSold}</span></label>    
                    <label>Remaining amount from request: <span>${remain}</span></label>    
                    <label>Money made: <span>${money} USD</span></label> 
                </div>
                <div>
                <label>Fruits sold:</label>   
                    <ul>
                        ${fruits.map(fruit => `<li>${fruit}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `
        const div = document.createElement('div')
        div.innerHTML = sellHtml
        this.#div.appendChild(div)
    }
    #fillEmptyContainers() {
        this.#containers.forEach(container => {
            if (!container.isEmpty()) return
            const nextFruit = this.#fruits.find(fruit => !container.hasBeenFilledWith(fruit))
            if (!nextFruit) return
            container.fillWith(nextFruit)
        })
    }
    #checkContainers() {
        const numberOfContainers = this.#containers.length - 1
        for (let index = numberOfContainers; index > 0; index--) {
            const container = this.#containers[index]
            const nearToLeftContainer = this.#containers[index - 1]

            if (nearToLeftContainer.has() >= container.emptyPositions()) {
                container.pushIn(nearToLeftContainer.pullOut(container.emptyPositions()))
            } else {
                container.pushIn(nearToLeftContainer.pullOut(nearToLeftContainer.has()))
            }
        }
        this.#fillEmptyContainers()
    }
    sellAllFruits() {
        if(this.#getMostToRightContainer().isEmpty()) return

        const sell = this.sell()

        this.renderSell(sell)

        this.sellAllFruits()
    }
}
