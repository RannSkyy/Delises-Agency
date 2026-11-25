import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { NotificationItem } from '../types/delisas';

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onDeclineOrder: (id: string) => void;
  onViewOrderDetails: () => void;
  onApplyPromo: (code: string) => void;
}

export function NotificationsModal({
  isOpen,
  notifications,
  onClose,
  onDeclineOrder,
  onViewOrderDetails,
  onApplyPromo,
}: NotificationsModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-modal-title"
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
            className="relative z-10 w-full max-w-md rounded-[2rem] bg-[#F7F9F8] p-6 shadow-2xl border border-white"
          >
            <div className="flex items-center justify-between">
              <h2
                id="notifications-modal-title"
                className="font-display text-lg font-bold text-[#181C19]"
              >
                Notification
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notifications"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#181C19] shadow-xs hover:bg-[#EEF2EF] cursor-pointer"
              >
                <i className="ri-close-line text-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="rounded-2xl bg-white p-4 shadow-xs border border-[#EAEFEA]"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        notif.type === 'order'
                          ? 'bg-[#FEF4E4] text-[#C87A19]'
                          : 'bg-[#EEF6ED] text-[#58AE52]'
                      }`}
                    >
                      <i
                        className={
                          notif.type === 'order' ? 'ri-store-2-line text-lg' : 'ri-percent-line text-lg'
                        }
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-[#181C19]">{notif.restaurant}</p>
                        <span className="text-xs text-[#7D8881] shrink-0">{notif.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#515D56]">{notif.title}</p>
                      <p className="mt-0.5 text-xs text-[#68736C]">{notif.body}</p>

                      {notif.type === 'order' && notif.status === 'pending' && (
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onDeclineOrder(notif.id)}
                            className="rounded-full border border-[#D4DFD9] px-3.5 py-1.5 text-xs font-semibold text-[#5C6760] hover:bg-[#F5F7F6] cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onViewOrderDetails();
                            }}
                            className="rounded-full bg-[#58AE52] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#489742] cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {notif.type === 'order' && notif.status === 'declined' && (
                        <p className="mt-2 text-xs font-semibold text-[#C53B30]">
                          Order update declined
                        </p>
                      )}

                      {notif.promoCode && (
                        <button
                          type="button"
                          onClick={() => {
                            onApplyPromo(notif.promoCode!);
                            onClose();
                          }}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#58AE52] hover:underline cursor-pointer"
                        >
                          <span>Apply {notif.promoCode} to Cart</span>
                          <i className="ri-arrow-right-line text-sm" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
