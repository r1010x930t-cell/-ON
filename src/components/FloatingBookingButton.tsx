import React from 'react';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface FloatingBookingButtonProps {
  onClick?: () => void;
}

export default function FloatingBookingButton({ onClick }: FloatingBookingButtonProps) {
  const handleClick = () => {
    trackEvent('click_floating_booking', { placement: 'floating_action_button' });

    if (onClick) {
      onClick();
      return;
    }

    const element = document.getElementById('contact');
    if (element) {
      const offset = 75; // Account for sticky header
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = window.scrollY + elementRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside 
      aria-label="無料体験予約フローティングボタン"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 print:hidden pointer-events-auto"
    >
      <div className="relative group">
        {/* Subtle pulsing background glow for visual attention */}
        <div className="absolute -inset-1 bg-brand-olive/30 rounded-full blur-md group-hover:bg-brand-olive/50 transition-all duration-300 animate-pulse pointer-events-none"></div>

        {/* Small badge highlighting feature */}
        <div className="absolute -top-2.5 right-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-amber-100" />
            24h WEB・LINE受付
          </span>
        </div>

        {/* Main Floating Action Button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="無料体験を予約する"
          className="relative flex items-center gap-2 sm:gap-2.5 px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-brand-olive to-brand-dark hover:from-[#4E5C43] hover:to-[#22271E] text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300" />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">
            無料体験を予約する
          </span>
          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>
    </aside>
  );
}
