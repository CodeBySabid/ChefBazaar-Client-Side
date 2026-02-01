import DemoCard from './DemoCard';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const DailyMealsSection = () => {
    const axiosSecure = useAxiosSecure();
    const { data: foods = [] } = useQuery({
        queryKey: ['foods'],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/food`)
            return res.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6);
        })
    })

    return (
        <div className="p-10 bg-base-200">
            <div className="grid max-w-384 w-full mx-auto items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods?.map((food) => (
                    <div key={food._id} className="group bg-base-300 relative rounded-xl overflow-hidden shadow-lg">
                        {/* Image */}
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-64 object-cover transition-transform duration-300
             group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                            <Link to={`/meal-details/${food._id}`} className="btn btn-primary">
                                See Details
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="p-4 flex justify-between items-center flex-wrap ">
                            <h3 className="font-semibold">{food.foodName}</h3>
                            <h3 className="font-semibold">$ {food.price}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyMealsSection;