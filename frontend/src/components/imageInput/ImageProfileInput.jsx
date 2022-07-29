import { FileUpload } from '@mui/icons-material';
import React, { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { ImageProfileInputStyles } from './ImageInputStyles';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880;
// const BYTES_PER_KILO_BYTE = 1024;

// const convertBytesToKB = (bytes) => Math.round(bytes / BYTES_PER_KILO_BYTE);

const ImageProfileInput = ({ 
    updatePictureCb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}) => {

    const [image, setImage] = useState();

    const handleNewFileUpload = (e) => {
        const [file] = e.target.files;
        if (file.size <= maxFileSizeInBytes) {
            setImage(URL.createObjectURL(file));
            updatePictureCb(file);
        }
    }

    // const removeFile = (fileName) => {
    //     delete files[fileName];
    //     setFiles({ ...files });
    //     callUpdateFilesCb({ ...files });
    // };

    return (
        <ImageProfileInputStyles size={otherProps.size}>
            <div className="image-input-container">
                {
                    image ?
                    <div className="img-container">
                        <img src={image} alt="" />
                    </div> :
                    <div className="avatar">
                        <BsFillPersonFill className='icon' />
                    </div>
                }
                <div className="picture-upload-container">
                    <FileUpload className="icon" />
                    <p>Subir foto</p>
                    <input type="file" className="form-field" onChange={handleNewFileUpload} title='' value='' {...otherProps} />
                </div>
            </div>
        </ImageProfileInputStyles>
    );
}

export default ImageProfileInput;