import React, { useRef } from 'react';

const ImageUploadGrid = ({ images, setImages }) => {
  const fileInput = useRef();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...previews]);
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {images.map((img, i) => (
        <img key={i} src={img} alt={`preview-${i}`} width="100" height="100" style={{ objectFit: 'cover', borderRadius: '8px' }} />
      ))}
      <div
        className="d-flex align-items-center justify-content-center border border-secondary rounded"
        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
        onClick={() => fileInput.current.click()}
      >
        <strong>+</strong>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ImageUploadGrid;
