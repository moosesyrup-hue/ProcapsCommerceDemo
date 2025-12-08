import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

/**
 * Video Modal Component
 * Full-screen modal for playing video content
 * Includes backdrop, close button, and responsive iframe player
 */
export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Default to a placeholder YouTube video if no URL provided
  const embedUrl = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close video"
      >
        <X className="size-8 text-white" />
      </button>

      {/* Video container */}
      <div 
        className="relative w-full max-w-[1200px] aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="video-modal-title" className="sr-only">
          Video Player
        </h2>
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={embedUrl}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
