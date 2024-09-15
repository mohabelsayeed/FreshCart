
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
    const [category, setCategory] = useState([]);

    function getCategory() {
        axios
            .get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({ data }) => {
                setCategory(data.data);
            })
            .catch(() => {});
    }

    useEffect(() => {
        getCategory();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <h1 className="text-xl font-medium text-slate-500 my-4 px-6">
                Shop Popular Categories
            </h1>

            <Slider {...settings}>
                {category.map((img) => (
                    <div key={img.id} className="px-2">
                        <div className="relative w-full h-32 md:h-48 lg:h-64">
                            <img
                                src={img.image}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                alt={img.name}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
}






























