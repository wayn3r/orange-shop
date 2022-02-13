const $ = selector => document.querySelector(selector)
const button = $('button')
const containerInput = $('#containers')
const amountPerContainerInput = $('#amount-container')
const pricePerOrangeInput = $('#price-orange')
const sellsDiv = $('#sells')
const getValidValues = () => {
    const containers = parseInt(containerInput.value)
    const amountPerContainer = parseInt(amountPerContainerInput.value)
    const pricePerOrange = parseInt(pricePerOrangeInput.value)
    if (isNaN(containers) || isNaN(amountPerContainer) || isNaN(pricePerOrange)) {
        alert('All values must be numbers')
        throw new Error('All values must be numbers')
    }
    return { containers, amountPerContainer, pricePerOrange }
}

const generateSells = () => {
    const { containers, amountPerContainer, pricePerOrange } = getValidValues()
    sellsDiv.innerHTML = ''
    const manager = new ContainerManager(containers, amountPerContainer, pricePerOrange, sellsDiv)

    manager.fillContainersWith('orange', 'apple')
    manager.sellAllFruits()
}
button.addEventListener('click', generateSells)
