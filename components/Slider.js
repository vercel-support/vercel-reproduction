// OLD FILE --- REDUNDANT!

import { previousSlide, nextSlide, switchSlide } from '../utils/slider';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react';

const Slider = ({ slides, alt }) => {  
  const [hover, setHover] = useState(false)
  
  return(
    <div className="position-relative slideContainer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      { 
        slides.map((slide, index) => (
          <div className={index === 0 ? "slide fadeSlide active" : "slide fadeSlide"} key={index} id={index} >
            { 
              slide.video 
              ? <ReactPlayer className="slideImage" url={slide.video_url} width="100%" height="auto" controls playing={false} alt={alt} />
              : <img className="slideImage" src={slide.display_url} alt={alt} width="100%" height="auto" />
            }
            
          </div>
        )) 
      }

      {hover && 
        <>
          <a className="prev" onClick={previousSlide.bind(this)} >&#10094;</a>
          <a className="next" onClick={nextSlide.bind(this)} >&#10095;</a>
        </>
      }
      <div className="dot-indicator my-1" >
        {
          slides.map((e, index) => (<span 
            id={index}
            key={index}
            className={ index === 0 ? "dot dot-active" : "dot" }
            onClick={switchSlide.bind(this)} 
          ></span>))
        }
      </div>

    </div>
  )
  
}

export default Slider