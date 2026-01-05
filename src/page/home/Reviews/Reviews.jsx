
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewsCard from './ReviewsCard';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            title: "demo card",
            image: "",
            demoLink: "/demo2",
        },
        {
            id: 2,
            title: "demo card",
            image: "",
            demoLink: "/demo1",
        },
        {
            id: 2,
            title: "demo card",
            image: "",
            demoLink: "/demo1",
        },
        {
            id: 2,
            title: "demo card",
            image: "",
            demoLink: "/demo1",
        },
        {
            id: 2,
            title: "demo card",
            image: "",
            demoLink: "/demo1",
        },
    ];
    return (
        <div className='max-w-6xl mx-auto'>
            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    590: {
                        slidesPerView: 3,
                    },
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: "50%",
                    depth: 100,
                    modifier: 0.50,
                    scale: 0.60,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <ReviewsCard review={review}></ReviewsCard>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;