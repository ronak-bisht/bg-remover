// app/page.js
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setOriginalImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/remove-bg', { image: originalImage.split(',')[1] });
      setResultImage(response.data.resultImage);
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Background Remover</h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />

        <button
          onClick={removeBackground}
          disabled={!originalImage || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Remove Background'}
        </button>

        {originalImage && !resultImage && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Original Image:</h2>
            <img src={originalImage} alt="Original" className="mt-2 rounded-md" />
          </div>
        )}

        {resultImage && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">Background Removed:</h2>
            <img src={resultImage} alt="Background Removed" className="mt-2 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
}
