import React from 'react';
import LogoCarousel from './LogoCarousel';
import { logos } from './logos';

const Affiliates = () => {
    return (
        <section className="w-full py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    Awards & Recognition
                </h2>
                <LogoCarousel logos={logos} />
            </div>
        </section>
    );
};

export default Affiliates;
