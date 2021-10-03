const previousSlide = (e) => {
  const parent = e.target.parentNode;
  const active = parent.querySelector('.active');
  const dots = parent.querySelector('.dot-indicator');

  
  if(active.previousElementSibling && active.previousElementSibling.classList.contains('slide')) {
    const previous = active.previousElementSibling;

    dots.querySelector('.dot-active').classList.remove('dot-active');
    dots.children[previous.id].classList.add('dot-active')

    active.classList.remove('active')
    previous.classList.add('active')
  }

}

const nextSlide = (e) => {
  const parent = e.target.parentNode;
  const active = parent.querySelector('.active');
  const dots = parent.querySelector('.dot-indicator');

  
  if(active.nextElementSibling && active.nextElementSibling.classList.contains('slide')) {
    const next = active.nextElementSibling;      

    dots.children[next.id].classList.add('dot-active')
    dots.querySelector('.dot-active').classList.remove('dot-active');

    active.classList.remove('active')
    next.classList.add('active')
  }
}

const switchSlide = (e) => {
  const dotParent = e.target.parentElement;
  const slideParent = dotParent.parentElement;
  const id = e.target.id

  dotParent.querySelector('.dot-active').classList.remove('dot-active')
  e.target.classList.add('dot-active')
  
  const slides = slideParent.querySelectorAll('.slide')

  slideParent.querySelector('.active').classList.remove('active')
  slides[id].classList.add('active')
}

module.exports = { previousSlide, nextSlide, switchSlide }