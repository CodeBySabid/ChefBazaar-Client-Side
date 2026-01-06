import React from 'react';
import DemoCard from './DemoCard';

const DailyMealsSection = () => {

    const demoCards = [
        {
            id: 1,
            title: "demo card",
            image: "/ygh",
            demoLink: "/demo2",
        },
        {
            id: 2,
            title: "demo card",
            image: "/tghg",
            demoLink: "/demo1",
        },
        {
            id: 3,
            title: "demo card",
            image: "/gh",
            demoLink: "/demo2",
        },
        {
            id: 4,
            title: "demo card",
            image: "/g",
            demoLink: "/demo1",
        },
        {
            id: 5,
            title: "demo card",
            image: "/ggg",
            demoLink: "/demo2",
        },
        {
            id: 6,
            title: "demo card",
            image: "/hgfh",
            demoLink: "/demo1",
        },
    ];

    return (
        <div className="p-10 bg-base-200">
            <div className="grid container mx-auto items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {demoCards.map((card) => (
                    <DemoCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default DailyMealsSection;