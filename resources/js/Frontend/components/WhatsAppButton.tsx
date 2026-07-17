const WHATSAPP_NUMBER = "917738574635"; // +91 77385 74635
const WHATSAPP_MESSAGE =
  "Hi Abhyuthanam Recyclers, I'd like to know more about your e-waste recycling services.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-card transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="size-7 shrink-0 fill-current" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.594 4.46 1.72 6.402L3.2 28.8l6.57-1.7a12.74 12.74 0 0 0 6.234 1.62h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.72-12.805-12.72zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.388-.23-4.03 1.043 1.075-3.928-.253-.403a10.55 10.55 0 0 1-1.62-5.64c0-5.87 4.777-10.646 10.65-10.646 2.844 0 5.517 1.11 7.53 3.123a10.57 10.57 0 0 1 3.117 7.53c0 5.87-4.777 10.646-10.65 10.646zm5.842-7.968c-.32-.16-1.894-.934-2.188-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.352-.498-2.576-1.588-.952-.85-1.595-1.9-1.782-2.22-.187-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.987-2.376-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.669s1.147 3.096 1.307 3.31c.16.213 2.256 3.443 5.466 4.828.764.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}
