import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full group relative rounded-2xl px-6 py-4 font-black uppercase tracking-wide',
        'bg-nexus-green text-nexus-dark',
        'shadow-[0_0_30px_rgba(0,231,1,0.45)]',
        'border border-nexus-green/60',
        'transition-all duration-200 will-change-transform',
        'hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(0,231,1,0.6)]',
        'active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-nexus-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nexus-dark',
        className ?? '',
      ].join(' ')}
    >
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity bg-white" />
      <span className="relative inline-flex items-center justify-center gap-2">
        <i className="fa-brands fa-whatsapp text-[20px]" aria-hidden="true"></i>
        {text}
      </span>
    </button>
  );
};
