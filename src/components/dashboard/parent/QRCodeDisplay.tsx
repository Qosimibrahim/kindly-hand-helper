
import { useState } from 'react';

interface QRCodeDisplayProps {
  text: string;
  size?: number;
}

export const QRCodeDisplay = ({ text, size = 200 }: QRCodeDisplayProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Using QR Server API to generate QR code
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  if (imageError) {
    return (
      <div 
        className="bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500"
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <p className="text-sm">QR Code</p>
          <p className="text-xs">Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={qrUrl}
      alt={`QR Code for ${text}`}
      width={size}
      height={size}
      className="border-2 border-gray-200 rounded-lg"
      onError={() => setImageError(true)}
    />
  );
};
