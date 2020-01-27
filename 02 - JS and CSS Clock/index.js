const secondHand = document.querySelector('.second-hand')
const minuteHand = document.querySelector('.minute-hand')
const hourHand = document.querySelector('.hour-hand')

function setDate() {
    const now = new Date()
    const seconds = now.getSeconds();
    // add 90 cuz starting point is transform: rotate(90deg) 
    const secondsDegree = ((seconds / 60) * 360) + 90
    secondHand.style.transform = `rotate(${secondsDegree}deg)`
    
    const minutes = now.getMinutes();
    const minutesDegree = ((minutes / 60) * 369) + 90
    minuteHand.style.transform = `rotate(${minutesDegree}deg)`

    const hours = now.getHours();
    const hoursDegree = ((hours / 12) * 369) + 90
    hourHand.style.transform = `rotate(${hoursDegree}deg)`

    
}

setInterval(() => {
    setDate()
}, 1000);
