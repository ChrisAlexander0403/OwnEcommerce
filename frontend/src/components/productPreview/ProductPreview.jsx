import React, { useEffect, useState } from 'react';
import { ImageNotSupported } from '@mui/icons-material';
import { ProductPreviewStyles } from './ProductPreviewStyles';
import useImage from '../../hooks/useImage';

const ProductPreview = ({ images = [], host }) => {

    const [selectedImage, setSelectedImage] = useState();

    const image1 = useImage();
    const image2 = useImage();
    const image3 = useImage();
    const image4 = useImage();
    const previewImage = useImage();
    
    const selectImage = (id) => {
        const container = document.getElementById(`image${id}`);
        if (container) {
            const img = container.getElementsByTagName('img')[0];

            if (img) setSelectedImage(img.getAttribute('src'));
        }
    }

    useEffect(() => {
      setSelectedImage(host + images[0]);
    }, [host, images]);
    

  return (
    <ProductPreviewStyles>
        <div className="image image1">
            {
                image1(host + images[0]).exists ?
                <div id="image1" className="image-container" onClick={() => selectImage(1)}>
                    <img src={host + images[0]} alt="" />
                </div> :    
                <div className="icon-container">
                    <ImageNotSupported className="icon" />
                </div>
            }    
        </div>
        <div className="image image2">
            {
                image2(host + images[1]).exists ?
                <div id="image2" className="image-container">
                    <img src={host + images[1]} alt="" />
                </div> :    
                <div className="icon-container">
                    <ImageNotSupported className="icon" />
                </div>
            } 
        </div>
        <div className="image image3">
            {
                image3(host + images[2]).exists ?
                <div id="image3" className="image-container">
                    <img src={host + images[2]} alt="" />
                </div> :    
                <div className="icon-container">
                    <ImageNotSupported className="icon" />
                </div>
            } 
        </div>
        <div className="image image4">
            {
                image4(host + images[3]).exists ?
                <div id="image4" className="image-container">
                    <img src={host + images[3]} alt="" />
                </div> :    
                <div className="icon-container">
                    <ImageNotSupported className="icon" />
                </div>
            } 
        </div>
        <div className="preview">
            {
                previewImage(selectedImage).exists ? 
                <div className="image-container">
                    <img src={selectedImage} alt="" />
                </div> 
                :
                <div className="icon-container">
                    <ImageNotSupported className="icon" />
                </div>
            }
        </div>
    </ProductPreviewStyles>
  );
}

export default ProductPreview;