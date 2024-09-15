import React from 'react';
import Slider from 'react-slick';
import img1 from '../../assets/img/slider-image-1.jpeg';
import img2 from '../../assets/img/slider-image-2.jpeg';
import img3 from '../../assets/img/grocery-banner-2.jpeg';
import img4 from '../../assets/img/grocery-banner.png';

export default function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <div className="w-full md:w-2/3 ">
                    <Slider {...settings}>
                        <div className="relative w-full aspect-w-16 aspect-h-9">
                            <img
                                src={img3}
                                className="object-cover w-full h-full rounded-lg"
                                alt="Image 3"
                            />
                        </div>
                        <div className="relative w-full aspect-w-16 aspect-h-9">
                            <img
                                src={img4}
                                className="object-cover w-full h-full rounded-lg"
                                alt="Image 4"
                            />
                        </div>
                    </Slider>
                </div>
               
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <div className="relative w-full aspect-w-1 aspect-h-1">
                        <img
                            src={img1}
                            className="object-cover w-full h-full rounded-lg"
                            alt="Image 1"
                        />
                    </div>
                    <div className="relative w-full aspect-w-1 aspect-h-1">
                        <img
                            src={img2}
                            className="object-cover w-full h-full rounded-lg"
                            alt="Image 2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}






