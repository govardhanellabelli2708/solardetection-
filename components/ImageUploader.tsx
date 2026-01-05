import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer
        border-2 border-dashed rounded-xl p-12
        flex flex-col items-center justify-center text-center
        transition-all duration-300 ease-in-out
        ${isDragging 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700/30 bg-slate-800/30'
        }
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className={`
        p-4 rounded-full mb-4 transition-transform duration-300
        ${isDragging ? 'bg-blue-500/20 scale-110' : 'bg-slate-700 group-hover:bg-slate-600'}
      `}>
        <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-400' : 'text-slate-300'}`} />
      </div>
      
      <h3 className="text-lg font-medium text-slate-200 mb-2">
        Upload EL Image
      </h3>
      <p className="text-slate-400 text-sm max-w-xs">
        Drag and drop your solar cell electroluminescence image here, or click to browse
      </p>
      
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <ImageIcon className="w-3 h-3" />
        <span>Supports JPG, PNG, TIFF</span>
      </div>
    </div>
  );
};
