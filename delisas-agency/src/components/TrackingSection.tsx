import { motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedHeading';
import { DishImage } from './DishImage';
import type { OrderRecord } from '../types/delisas';
import { formatCurrency } from '../utils/orderLogic';

interface TrackingSectionProps {
  order: OrderRecord;
  onAdvanceStep: () => void;
  onResetTracking: () => void;
  onOpenCourierModal: (mode: 'message' | 'call') => void;
}

export function TrackingSection({
  order,
  onAdvanceStep,
  onResetTracking,
  onOpenCourierModal,
}: TrackingSectionProps) {
  const isDelivered = order.currentStepIndex >= order.steps.length - 1;
  const activeStep = order.steps[order.currentStepIndex];

  const routeProgress =
    order.currentStepIndex === 0
      ? 22
      : order.currentStepIndex === 1
      ? 48
      : order.currentStepIndex === 2
      ? 72
      : 100;

  return (
    <section id="tracking" className="py-16 sm:py-20 bg-white/80 border-y border-[#D7E1DB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#58AE52]">Real-Time Route</p>
            <AnimatedHeading
              text="Live Delivery Tracking & Order Summary"
              className="mt-1 font-display text-3xl font-bold tracking-tight text-[#181C19] sm:text-4xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onAdvanceStep}
              disabled={isDelivered}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#58AE52] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#489742] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-navigation-line text-sm" aria-hidden="true" />
              <span>{isDelivered ? 'Order Delivered' : 'Simulate Next Stage'}</span>
            </button>

            {order.currentStepIndex > 0 && (
              <button
                type="button"
                onClick={onResetTracking}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#CFDAD4] bg-white px-4 py-2 text-xs font-semibold text-[#181C19] transition-colors hover:bg-[#F3F6F4] whitespace-nowrap cursor-pointer"
              >
                <i className="ri-refresh-line text-sm" aria-hidden="true" />
                <span>Reset Demo</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Map + Courier Card matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 overflow-hidden rounded-3xl border border-[#DCE4DF] bg-[#F7F9F8] shadow-sm"
          >
            {/* Stylized New York City Map Route */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#EEF2EF]">
              <svg
                viewBox="0 0 640 320"
                className="h-full w-full"
                role="img"
                aria-label="Delivery route map in New York from restaurant to your address"
              >
                {/* City Blocks & Parks */}
                <rect width="640" height="320" fill="#EDF2EE" />
                <path
                  d="M0 70 L640 120 M0 190 L640 230 M110 0 L170 320 M310 0 L265 320 M480 0 L535 320"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  fill="none"
                />
                <path
                  d="M40 20 L240 280 M420 10 L610 170"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  fill="none"
                />
                <rect x="340" y="95" width="95" height="65" rx="14" fill="#DCE8DF" />

                {/* Street Labels matching reference */}
                <text x="152" y="102" fill="#8A968E" fontSize="11" fontWeight="500">
                  Fork dark St
                </text>
                <text x="86" y="182" fill="#8A968E" fontSize="11" fontWeight="500">
                  345 Hollow Road
                </text>
                <text x="355" y="132" fill="#5D6B62" fontSize="13" fontWeight="600">
                  New York
                </text>
                <text x="492" y="95" fill="#8A968E" fontSize="11" fontWeight="500">
                  3796 Hillview St
                </text>

                {/* Active Route Line */}
                <path
                  d="M210 120 C 265 155, 300 195, 365 200 C 425 205, 475 155, 535 125"
                  stroke="#58AE52"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="1 10"
                  fill="none"
                  opacity="0.35"
                />
                <path
                  d="M210 120 C 265 155, 300 195, 365 200 C 425 205, 475 155, 535 125"
                  stroke="#58AE52"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  pathLength={100}
                  strokeDashoffset={100 - routeProgress}
                  strokeDasharray="100"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />

                {/* Origin Restaurant Pin */}
                <g transform="translate(210, 120)">
                  <circle r="16" fill="#FFFFFF" stroke="#58AE52" strokeWidth="3" />
                  <circle r="6" fill="#E66A2C" />
                </g>

                {/* Destination Customer Pin */}
                <g transform="translate(535, 125)">
                  <circle r="18" fill="#58AE52" opacity="0.2" />
                  <circle r="10" fill="#58AE52" stroke="#FFFFFF" strokeWidth="3" />
                </g>
              </svg>

              {/* Floating Courier Scooter Marker */}
              <div
                style={{
                  left:
                    order.currentStepIndex === 0
                      ? '33%'
                      : order.currentStepIndex === 1
                      ? '51%'
                      : order.currentStepIndex === 2
                      ? '67%'
                      : '83%',
                  top:
                    order.currentStepIndex === 0
                      ? '38%'
                      : order.currentStepIndex === 1
                      ? '59%'
                      : order.currentStepIndex === 2
                      ? '58%'
                      : '39%',
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#58AE52] text-white shadow-lg ring-4 ring-white">
                  <i className="ri-e-bike-2-fill text-xl" aria-hidden="true" />
                </div>
              </div>

              {/* Order Tag Overlay */}
              <div className="absolute top-4 left-4 rounded-2xl bg-white/95 px-3.5 py-2 shadow-sm backdrop-blur-xs">
                <p className="text-[11px] font-medium text-[#68736C]">Active Ticket</p>
                <p className="tabular-nums font-display text-sm font-bold text-[#181C19]">
                  Order #{order.orderId} · {order.restaurant}
                </p>
              </div>
            </div>

            {/* Green Delivery Status Strip */}
            <div className="bg-[#58AE52] px-5 py-4 text-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white/20 text-center tabular-nums">
                  <span className="text-sm font-extrabold leading-none">
                    {isDelivered ? '0' : order.arrivalMinutes}
                  </span>
                  <span className="text-[10px] leading-none mt-0.5">min</span>
                </div>
                <div>
                  <p className="font-display text-base font-bold">{activeStep.title}</p>
                  <p className="text-xs text-white/90">{activeStep.description}</p>
                </div>
              </div>
              <span className="tabular-nums text-xs font-semibold text-white/95">
                ETA {activeStep.time}
              </span>
            </div>

            {/* Courier Card */}
            <div className="p-5 bg-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <DishImage
                  src={order.courier.avatar}
                  alt={order.courier.name}
                  className="h-12 w-12 rounded-full object-cover border border-[#DCE4DF]"
                  fallbackIconClass="ri-user-smile-line"
                />
                <div>
                  <p className="font-display text-sm font-bold text-[#181C19]">
                    {order.courier.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#647068] tabular-nums">
                    <span>{order.courier.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-0.5 font-semibold text-[#181C19]">
                      <i className="ri-star-fill text-[#58AE52]" aria-hidden="true" />
                      {order.courier.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenCourierModal('message')}
                  aria-label={`Message courier ${order.courier.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4DFD9] bg-[#F7F9F8] text-[#181C19] transition-colors hover:bg-[#EEF6ED] hover:text-[#58AE52] cursor-pointer"
                >
                  <i className="ri-chat-3-line text-lg" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCourierModal('call')}
                  aria-label={`Call courier ${order.courier.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#58AE52] text-white transition-colors hover:bg-[#489742] cursor-pointer"
                >
                  <i className="ri-phone-fill text-lg" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Timeline + Order Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* 4-Step Delivery Timeline */}
            <div className="rounded-3xl border border-[#DCE4DF] bg-white p-6 shadow-xs">
              <h3 className="font-display text-lg font-bold text-[#181C19]">Delivery Timeline</h3>
              <ol className="mt-5">
                {order.steps.map((step, index) => {
                  const isCompleted = index <= order.currentStepIndex;
                  const isCurrent = index === order.currentStepIndex;
                  const isLast = index === order.steps.length - 1;
                  return (
                    <li key={step.id} className="relative flex items-stretch gap-3.5">
                      <div className="flex flex-col items-center">
                        <span
                          className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            isCompleted
                              ? 'border-[#58AE52] bg-[#58AE52] text-white'
                              : 'border-[#CFDAD4] bg-white text-[#9AA59E]'
                          }`}
                        >
                          <i
                            className={isCompleted ? 'ri-check-line text-sm' : 'ri-time-line text-xs'}
                            aria-hidden="true"
                          />
                        </span>
                        {!isLast && (
                          <span
                            aria-hidden="true"
                            className={`w-0.5 flex-1 my-1 min-h-4 ${
                              index < order.currentStepIndex ? 'bg-[#58AE52]' : 'bg-[#E2E9E5]'
                            }`}
                          />
                        )}
                      </div>

                      <div className={`flex flex-1 items-start justify-between gap-2 pt-0.5 ${isLast ? 'pb-0' : 'pb-5'}`}>
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isCurrent
                                ? 'text-[#58AE52]'
                                : isCompleted
                                ? 'text-[#181C19]'
                                : 'text-[#7D8881]'
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-[#68736C]">{step.description}</p>
                        </div>
                        <span className="tabular-nums text-xs font-medium text-[#68736C] shrink-0">
                          {step.time}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Order Items & Receipt */}
            <div className="rounded-3xl border border-[#DCE4DF] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EEF3F0] pb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#181C19]">Order Details</h3>
                  <p className="tabular-nums text-xs text-[#68736C]">
                    Order ID: #{order.orderId} · {order.placedAt}
                  </p>
                </div>
                <span className="tabular-nums text-sm font-bold text-[#58AE52]">
                  {formatCurrency(order.total)}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {order.items.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#181C19] truncate">
                        {item.quantity}x {item.name}
                      </p>
                      <p className="text-xs text-[#68736C] truncate">{item.detail}</p>
                    </div>
                    <span className="tabular-nums font-semibold text-[#181C19] shrink-0">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-[#EEF3F0] pt-4 text-xs tabular-nums">
                <div className="flex justify-between text-[#68736C]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#181C19]">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#68736C]">
                  <span>Delivery</span>
                  <span className="font-medium text-[#181C19]">
                    {formatCurrency(order.deliveryFee)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#58AE52]">
                    <span>Promo Discount</span>
                    <span className="font-semibold">-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 text-sm font-bold text-[#181C19]">
                  <span>Total Paid</span>
                  <span className="text-[#58AE52]">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
