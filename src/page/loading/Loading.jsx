import React from 'react';
import './loading.css'

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div id="page">
            <div id="container">
                <div id="ring"></div>
                <div id="ring"></div>
                <div id="ring"></div>
                <div id="ring"></div>
                <div id="h3">loading</div>
            </div>
        </div>
        </div>
    );
};

export default Loading;