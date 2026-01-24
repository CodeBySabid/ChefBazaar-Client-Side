import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewsCard from './ReviewsCard';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Reviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    });

    const ReviewSkeleton = () => (
        <div className="flex flex-col gap-4 w-72 p-4 bg-gray-200 rounded-xl animate-pulse">
            <div className="h-32 w-full bg-gray-300 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
    );

    return (
        <div className='bg-base-200 w-full'>
            <div className='max-w-6xl py-6 mx-auto'>
                {isLoading ? (
                    <div className="flex justify-center gap-6 overflow-hidden">
                        {[1, 2, 3].map((n) => <ReviewSkeleton key={n} />)}
                    </div>
                ) : (
                    <Swiper
                        loop={reviews.length >= 3}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            590: { slidesPerView: 3 },
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
                        {reviews.map(review => (
                            <SwiperSlide key={review.id}>
                                <ReviewsCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default Reviews