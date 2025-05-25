import React, { useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const cloudinaryAxios = axios.create(); // Axios instance without global headers

const CLOUD_NAME = 'duo1gzdhe';
const UPLOAD_PRESET = 'MiniProj_unsigned';

const ImageUploadGrid = ({ images, setImages }) => {
  const fileInput = useRef();
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async (event) => {
    const files = event.target.files;
    const uploadedUrls = [];
    setUploading(true); // Start spinner

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      try {
        // ✅ FIXED: Store the response
        const response = await cloudinaryAxios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Push full URL object, or just the URL depending on usage
        uploadedUrls.push({ url: response.data.secure_url });
      } catch (error) {
        console.error('❌ Cloudinary upload error:', error.message);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false); // Stop spinner
  };

  return (
    <div className="d-flex flex-wrap gap-3 align-items-center">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={`uploaded-${i}`}
          width="100"
          height="100"
          style={{
            objectFit: 'cover',
            borderRadius: '8px',
            border: '2px solid #ddd',
          }}
        />
      ))}

      <div
        className="d-flex align-items-center justify-content-center border rounded bg-light"
        style={{ width: '100px', height: '100px', cursor: 'pointer', position: 'relative' }}
        onClick={() => !uploading && fileInput.current.click()}
      >
        {uploading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <strong style={{ fontSize: '1.5rem' }}>+</strong>
        )}
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
