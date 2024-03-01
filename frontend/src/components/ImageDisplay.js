import React from 'react';

const ImageDisplay = ({ imageUrl, altText }) => {
  return (
    <div>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default ImageDisplay;
