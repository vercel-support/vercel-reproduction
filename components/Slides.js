import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Player from "./Player";
import { proxy_link } from "../utils/proxy_link";

SwiperCore.use([Navigation, Pagination]);

const Slides = ({ slides, alt = "" }) => {
  return (
    <>
      <Swiper navigation pagination={{ clickable: true }} slidesPerColumn={1}>
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              {slide.video ? (
                <Player node={slide} />
              ) : (
                <img
                  className="slideImage"
                  src={proxy_link(slide.thumbnail)}
                  alt={alt}
                  width="100%"
                  height="auto"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slides;
