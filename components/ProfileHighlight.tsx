import React from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

type ProfileHighlightProps = {
  imageUrl?: string;
  variant?: 'card' | 'standalone';
};

export const ProfileHighlight: React.FC<ProfileHighlightProps> = ({ imageUrl, variant = 'card' }) => {
  const avatar = (
    <div className="relative my-2">
      <div className="absolute inset-0 rounded-full blur-2xl bg-nexus-cyan/20" />
      <div className="absolute inset-0 rounded-full blur-2xl bg-nexus-green/20" />
      <div className="relative h-56 w-56 md:h-60 md:w-60 rounded-full p-[4px] bg-gradient-to-br from-nexus-cyan via-nexus-green to-nexus-cyan shadow-[0_0_70px_rgba(0,231,1,0.20)]">
        <div className="h-full w-full rounded-full bg-nexus-dark border-4 border-gray-900 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Foto de perfil"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="px-5 text-xs font-bold text-gray-400">Coloque sua foto aqui</div>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 right-4 bg-nexus-card border border-nexus-green text-nexus-green text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 bg-nexus-green rounded-full animate-pulse"></span>
        ONLINE
      </div>
    </div>
  );

  if (variant === 'standalone') {
    return (
      <section className="w-full mb-6">
        <div className="relative flex flex-col items-center text-center">{avatar}</div>
      </section>
    );
  }

  return (
    <section className="w-full mb-8">
      <div className="bg-nexus-card border border-gray-800 rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-nexus-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-nexus-cyan/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {avatar}

          <div className="mt-4 text-sm text-gray-400">Operação assistida por IA · suporte no WhatsApp</div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-nexus-dark/60 border border-gray-800 px-2.5 py-1 text-xs text-gray-200">
              <ShieldCheck className="h-3.5 w-3.5 text-nexus-green" />
              Atendimento direto
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-nexus-dark/60 border border-gray-800 px-2.5 py-1 text-xs text-gray-200">
              <Users className="h-3.5 w-3.5 text-nexus-cyan" />
              Comunidade ativa
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-nexus-dark/60 border border-gray-800 px-2.5 py-1 text-xs text-gray-200">
              <Star className="h-3.5 w-3.5 text-yellow-400" />
              Alta satisfação
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
