import React from 'react';
import DemoCard from './DemoCard';

const DailyMealsSection = () => {

    const demoCards = [
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
    ];

    return (
        <div className="p-10">
            <div className="grid container mx-auto items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {demoCards.map((card) => (
                    <DemoCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default DailyMealsSection;