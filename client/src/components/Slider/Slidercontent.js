import React from "react";

function Slidercontent({ activeIndex, sliderImage }) {
  return (
    <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slide.urls} alt="" />
        
         
        </div>
      ))}
    </section>
  );
}

export default Slidercontent;