import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function CarouselWithLogo({ language }) {
  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <SwiperSlide key={num}>
            <img
              src={`/images/cover/${num}.jpg`}
              alt={`Slide ${num}`}
              className="w-full h-full object-cover opacity-40"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/images/white-logo.png"
          alt="Logo"
          className="h-64 md:h-96 object-contain drop-shadow-xl z-50"
        />
      </div>
    </div>
  );
}
