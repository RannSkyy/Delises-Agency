import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DishImage } from './DishImage';

interface CourierModalProps {
  mode: 'message' | 'call' | null;
  courier: {
    name: string;
    role: string;
    rating: number;
    avatar: string;
    phone: string;
  };
  onClose: () => void;
}

export function CourierModal({ mode, courier, onClose }: CourierModalProps) {
  const [note, setNote] = useState('');
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!mode) {
      setNote('');
      setSentMessage(null);
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, onClose]);

  if (!mode) {
    return null;
  }

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) {
      return;
    }
    setSentMessage(note.trim());
    setNote('');
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="courier-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#181C19]/45 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <h2 id="courier-modal-title" className="font-display text-lg font-bold text-[#181C19]">
              {mode === 'call' ? 'Courier Dispatch Line' : `Message ${courier.name}`}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close courier dialog"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7F6] text-[#181C19] hover:bg-[#E7EDE9] cursor-pointer"
            >
              <i className="ri-close-line text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3.5 rounded-2xl bg-[#F7F9F8] p-3.5">
            <DishImage
              src={courier.avatar}
              alt={courier.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-sm font-bold text-[#181C19]">{courier.name}</p>
              <p className="tabular-nums text-xs text-[#647068]">
                {courier.role} · ★ {courier.rating.toFixed(1)} · {courier.phone}
              </p>
            </div>
          </div>

          {mode === 'call' ? (
            <div className="mt-5 space-y-4 text-center">
              <p className="text-sm text-[#515D56]">
                Direct masked courier line is active for your ongoing delivery.
              </p>
              <a
                href={`tel:${courier.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#58AE52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#489742]"
              >
                <i className="ri-phone-fill text-base" aria-hidden="true" />
                <span>Call {courier.phone}</span>
              </a>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {['Leave at front door', 'Ring doorbell twice', 'Call on arrival'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNote(preset)}
                    className="rounded-full border border-[#D4DFD9] bg-[#F7F9F8] px-3 py-1.5 text-xs font-medium text-[#181C19] hover:border-[#58AE52] cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {sentMessage && (
                <div className="rounded-2xl bg-[#EEF6ED] px-4 py-3 text-xs font-medium text-[#2F722A]">
                  Sent to {courier.name}: “{sentMessage}”
                </div>
              )}

              <form onSubmit={handleSendNote} className="flex items-center gap-2">
                <label htmlFor="courier-note-input" className="sr-only">
                  Delivery note for courier
                </label>
                <input
                  id="courier-note-input"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write delivery instructions..."
                  className="min-h-[44px] flex-1 rounded-full border border-[#CFDAD4] px-4 text-sm text-[#181C19] focus:border-[#58AE52] focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#58AE52] text-white hover:bg-[#489742] cursor-pointer"
                  aria-label="Send message to courier"
                >
                  <i className="ri-send-plane-fill text-base" aria-hidden="true" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
