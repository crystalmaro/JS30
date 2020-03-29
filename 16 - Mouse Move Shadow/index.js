const hero = document.querySelector('.hero')
const text = hero.querySelector('h1')
const walk = 150; 

function shadow(e) {
  // const width = hero.offsetWidth;
  // const height = hero.offsetHeight;
  const {offsetWidth: width, offsetHeight: height} = hero;
  // let x = e.offsetX;
  // let y = e.offsetY;
  let {offsetX: x, offsetY: y} = e;
  
  // this: the thing you listen on
  // e.target: the thing that triggers on
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(0,220,220,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(199,0,199,0.7),
    ${xWalk}px ${yWalk * -1}px 0 rgba(150,150,150,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,225,0,0.7)
    `
}


hero.addEventListener('mousemove', shadow)