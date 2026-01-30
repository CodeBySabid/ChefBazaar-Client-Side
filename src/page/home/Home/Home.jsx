import React from 'react';
import BannerSection from '../header/BannerSection';
import DailyMealsSection from '../DailyMealsSection';
import Reviews from '../Reviews/Reviews';
import OurServices from '../OurServices/OurServices';

const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <DailyMealsSection></DailyMealsSection>
            <Reviews></Reviews>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;