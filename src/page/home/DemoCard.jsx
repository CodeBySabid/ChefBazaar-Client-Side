import { Link } from "react-router";

const DemoCard = ({ food }) => {

  return (
    <div className="group bg-base-300 relative rounded-xl overflow-hidden shadow-lg">
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
          View Demo
        </Link>
      </div>

      {/* Title */}
      <div className="p-4 flex justify-between items-center flex-wrap ">
        <h3 className="font-semibold">{food.foodName}</h3>
        <h3 className="font-semibold">$ {food.price}</h3>
      </div>
    </div>
  );
};

export default DemoCard;