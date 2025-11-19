import React, { useState, type ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoUploadProps {
    onPhotoSelect: (file: File) => void;
    currentPhoto?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelect, currentPhoto }) => {
    const [preview, setPreview] = useState<string | null>(currentPhoto || null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onPhotoSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const clearPhoto = () => {
        setPreview(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: isDragging ? '3px dashed var(--color-primary)' : '2px dashed var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-subtle)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                }}
                onClick={() => document.getElementById('photo-upload')?.click()}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Profile preview"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearPhoto();
                            }}
                            className="btn btn-ghost"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                padding: 'var(--space-2)',
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        <Upload size={32} style={{ marginBottom: 'var(--space-2)' }} />
                        <p className="text-sm">Drop photo or click</p>
                    </div>
                )}
            </div>
            <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default PhotoUpload;
