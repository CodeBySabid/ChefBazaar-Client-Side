import React from 'react';
import BannerSection from '../header/BannerSection';
import DailyMealsSection from '../SeeDetails';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <DailyMealsSection></DailyMealsSection>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;