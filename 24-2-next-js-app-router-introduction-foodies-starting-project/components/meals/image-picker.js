'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

  const inputRef = useRef();

  function handlePickClick(event) {
    event.preventDefault();
    inputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();  
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>
        {label}
      </label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image 
              src={pickedImage} 
              alt="Uploaded" 
              fill 
              sizes="100%"
            />
          )}
        </div>
        <input 
          className={classes.input}
          type="file" 
          id={name} 
          accept="image/png, image/jpeg" 
          name={name} 
          ref={inputRef}
          onChange={handleImageChange}
          required
        />
        <button 
          className={classes.button} 
          type="button"
          onClick={handlePickClick}
        >
          Pick Image
        </button>
      </div>
    </div>
  );
}
