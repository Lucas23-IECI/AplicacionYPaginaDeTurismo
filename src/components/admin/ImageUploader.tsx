import React, { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { uploadEventImage, deleteEventImage, getPublicUrl } from '../../lib/storage';

interface ImageUploaderProps {
  eventId: string;
  existingImages: { url: string; path: string }[];
  onImagesChange: (images: { url: string; path: string }[]) => void;
}

export default function ImageUploader({ eventId, existingImages, onImagesChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    const newImages = [...existingImages];
    for (const file of Array.from(files) as File[]) {
      const path = await uploadEventImage(file, eventId);
      if (path) {
        const url = getPublicUrl('event-images', path);
        newImages.push({ url, path });
      }
    }
    onImagesChange(newImages);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleRemove = async (index: number) => {
    const img = existingImages[index];
    if (img.path) await deleteEventImage(img.path);
    onImagesChange(existingImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-3">
        {existingImages.map((img, i) => (
          <div key={i} className="relative group rounded-xl overflow-hidden border border-stone-200">
            <img src={img.url} alt="" className="w-full h-24 object-cover" />
            <button
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="h-24 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center text-stone-400 hover:border-primary hover:text-primary transition-colors"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={18} />
              <span className="text-[10px] mt-1">Subir</span>
            </>
          )}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
    </div>
  );
}
