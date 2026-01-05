import { Link } from "react-router";

const DemoCard = ({ card }) => {
  const { title, image, demoLink } = card;

  return (
    <div className="group bg-base-300 relative rounded-xl overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={image}
        alt={title}
          className="w-full h-64 object-cover transition-transform duration-300
             group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <Link to={demoLink} className="btn btn-primary">
          View Demo
        </Link>
      </div>

      {/* Title */}
      <div className="p-4 flex justify-between items-center flex-wrap ">
        <h3 className="font-semibold">{title}</h3>
        <h3 className="font-semibold">price: 524</h3>
      </div>
    </div>
  );
};

export default DemoCard;