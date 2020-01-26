
function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    
    if(!audio) return
    audio.currentTime = 0 //rewind to the beginning
    audio.play();
    
    key.classList.add('playing')
}

function removeTransition(e){
    if (e.propertyName !== 'transform') return
    this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
// below event is triggered, once a transition ends (transitionEnd)
// it's not transition-ed
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
window.addEventListener('keydown', playSound)