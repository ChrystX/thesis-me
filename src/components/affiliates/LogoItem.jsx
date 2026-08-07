import React from 'react';

const LogoItem = ({ logo, isTop }) => (
    <div
        className="zigzag-logo flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
        style={{
            alignSelf: isTop ? 'flex-start' : 'flex-end',
            marginTop: isTop ? 0 : 60,
            marginLeft: 10,
            marginRight: 10,
            width: 100,
        }}
    >
        <img
            src={logo.url}
            alt={logo.name}
            className="h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
            loading="lazy"
        />
    </div>
);

export default LogoItem;
