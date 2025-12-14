import React from 'react';
import {
  ShieldCheck,
  Smartphone,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Zap,
  MessageCircle,
} from 'lucide-react';
import { Button } from './components/Button';
import { Logo } from './components/Logo';
import { ProfileHighlight } from './components/ProfileHighlight';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';

const App: React.FC = () => {
  const handleJoinClick = () => {
    const phone = '5511982416073';
    const message = 'Quero operar com a nexus trade';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-nexus-dark text-white overflow-x-hidden selection:bg-nexus-green selection:text-nexus-dark">
      
      {/* Sticky Top Bar (Mobile Optimization) */}
      <div className="fixed top-0 w-full bg-nexus-dark/85 backdrop-blur-md border-b border-gray-800 z-50 py-3 px-4">
        <div className="mx-auto max-w-5xl flex items-center justify-end relative">
          <Logo
            className="absolute left-1/2 -translate-x-1/2"
            size={26}
          />
          <button
            type="button"
            onClick={handleJoinClick}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-800 bg-nexus-card px-4 py-2 text-sm font-bold text-gray-100 hover:border-nexus-green/30 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-nexus-green" />
            Falar no WhatsApp
          </button>
        </div>
      </div>

      <main className="container mx-auto max-w-5xl px-4 pt-16 pb-24 flex flex-col items-center text-center">
        
        {/* Hero Section */}
        <section className="w-full mb-8 animate-fade-in-up">
          <div className="mx-auto w-full max-w-3xl">
            {/* Mobile (agressivo / impulso) */}
            <div className="sm:hidden">
              <div className="mx-auto max-w-[420px]">
                <h1 className="mt-5 text-3xl font-black leading-[1.06] uppercase">
                  VOCÊ PODE FAZER DE
                  <span className="block my-3">
                    <span className="inline-block rounded-xl bg-nexus-green text-nexus-dark px-4 py-2 shadow-[0_0_35px_rgba(0,231,1,0.55)]">
                      R$300 A R$1.000
                    </span>
                  </span>
                  POR DIA COM ESSA IA
                  <span className="block mt-2 text-base text-gray-200">
                    <span className="font-bold text-nexus-green/90">MESMO SEM ENTENDER DE GRÁFICOS</span>
                  </span>
                </h1>

                <div className="mt-4 inline-flex items-center justify-center rounded-full border border-nexus-green/35 bg-nexus-green/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-nexus-green">
                  APENAS COM O CELULAR!
                </div>

                <div className="mt-6">
                  <ProfileHighlight variant="standalone" imageUrl="/perfil.png" />
                </div>

                <div className="mt-2 text-nexus-green font-black text-sm uppercase tracking-wider">
                  👇 TOQUE NO BOTÃO ABAIXO
                </div>

                <div className="mt-4">
                  <Button
                    text="UTILIZAR A IA AGORA MESMO"
                    onClick={handleJoinClick}
                    className="py-5 text-lg shadow-[0_0_45px_rgba(0,231,1,0.65)]"
                  />
                </div>

                <div className="mt-3 text-[12px] font-bold text-nexus-cyan/90">
                  + 499 traders já utilizam
                </div>
              </div>
            </div>

            {/* Desktop (clean) */}
            <div className="hidden sm:block">
              <h1 className="mt-5 text-4xl md:text-5xl font-black leading-[1.05] tracking-tight uppercase">
                VOCÊ PODE FAZER DE
                <span className="block mt-4">
                  <span className="inline-block rounded-2xl bg-nexus-green text-nexus-dark px-6 py-3 shadow-[0_0_45px_rgba(0,231,1,0.55)]">
                    R$300 A R$1.000
                  </span>
                </span>
                <span className="block mt-4 text-gray-200">POR DIA COM ESSA IA</span>
                <span className="block mt-3 text-base md:text-lg text-gray-200">
                  <span className="font-bold text-nexus-green/90">MESMO SEM ENTENDER DE GRÁFICOS</span>
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed">
                Você recebe um passo a passo direto para operar com apoio de IA e foco em consistência.
                Sem enrolação, sem termos difíceis e com acompanhamento no WhatsApp.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {[
                  { icon: <Smartphone className="h-5 w-5 text-nexus-green" />, title: '100% no celular', desc: 'Rotina prática, de qualquer lugar.' },
                  { icon: <Zap className="h-5 w-5 text-nexus-green" />, title: 'Sinais objetivos', desc: 'Entrada, alvo e gestão, sem adivinhação.' },
                  { icon: <Clock3 className="h-5 w-5 text-nexus-green" />, title: 'Configuração rápida', desc: 'Você entende o fluxo em poucos minutos.' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-gray-800 bg-nexus-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-xl bg-nexus-dark p-2">{item.icon}</div>
                      <div>
                        <div className="font-extrabold text-white">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Profile Image Section (desktop) */}
        <div className="hidden sm:block w-full max-w-3xl">
          <ProfileHighlight imageUrl="/perfil.png" />
        </div>

        {/* Call to Action Section */}
        <section className="w-full max-w-3xl space-y-4 mb-10">
          <div className="hidden sm:flex items-center justify-center gap-2 text-nexus-green font-black text-sm md:text-base uppercase tracking-wider">
            <span className="text-2xl">👇</span>
            Fale comigo e receba o passo a passo
          </div>
          
          <div className="hidden sm:block">
            <Button
              text="Quero falar no WhatsApp"
              onClick={handleJoinClick}
              className="animate-glow text-lg md:text-xl py-5"
            />
          </div>

          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {[
              { label: 'Resposta rápida', value: 'Atendimento direto' },
              { label: 'Orientação', value: 'Passo a passo' },
              { label: 'Acesso', value: 'Vagas limitadas' },
            ].map((m, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-800 bg-nexus-card px-4 py-3">
                <div className="text-xs text-gray-400">{m.label}</div>
                <div className="font-extrabold text-gray-100">{m.value}</div>
              </div>
            ))}
          </div>
          
          <p className="hidden sm:block text-xs text-gray-500 mt-2">
            <ShieldCheck className="w-3 h-3 inline mr-1" />
            Você conversa comigo no WhatsApp. Sem cadastro complicado.
          </p>
        </section>

        <div className="w-full max-w-3xl mb-10">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-400 mb-3 px-1">
            <span>Depoimentos</span>
            <span className="text-nexus-green flex items-center gap-2">
              <span className="w-2 h-2 bg-nexus-green rounded-full shadow-[0_0_14px_rgba(0,231,1,0.55)]"></span>
              Atualizado
            </span>
          </div>

          <TestimonialsCarousel
            intervalMs={15000}
            items={[
              { src: '/whatsapp-1.png', alt: 'Depoimento WhatsApp 1' },
              { src: '/whatsapp-2.png', alt: 'Depoimento WhatsApp 2' },
              { src: '/whatsapp-3.png', alt: 'Depoimento WhatsApp 3' },
              { src: '/whatsapp-4.png', alt: 'Depoimento WhatsApp 4' },
              { src: '/whatsapp-5.png', alt: 'Depoimento WhatsApp 5' },
              { src: '/whatsapp-6.png', alt: 'Depoimento WhatsApp 6' },
            ]}
          />
        </div>

        {/* Features / Benefits */}
        <section className="w-full max-w-3xl grid grid-cols-1 gap-4 mb-10">
          {[
            {
              icon: <Smartphone size={24} />,
              title: 'Operação simples e prática',
              desc: 'Você recebe o fluxo com clareza para aplicar no dia a dia, sem complicação.'
            },
            {
              icon: <TrendingUp size={24} />,
              title: 'Foco em consistência',
              desc: 'A ideia é reduzir ruído e melhorar decisões com orientação objetiva.'
            },
            {
              icon: <CheckCircle2 size={24} />,
              title: 'Acompanhamento no WhatsApp',
              desc: 'Você não fica perdido: eu te ajudo com o que fazer e como configurar.'
            }
          ].map((f, idx) => (
            <div key={idx} className="bg-nexus-card border border-gray-800 p-6 rounded-2xl flex items-start gap-4 hover:border-nexus-green/30 transition-colors">
              <div className="p-3 bg-nexus-dark rounded-xl text-nexus-green">{f.icon}</div>
              <div className="text-left">
                <h3 className="font-black text-lg text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Second CTA */}
        <section className="w-full max-w-3xl bg-gradient-to-b from-gray-900 to-nexus-dark border border-gray-800 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-green via-white to-nexus-green"></div>
          
          <AlertTriangle className="w-10 h-10 text-nexus-green mx-auto mb-4" />
          
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Vagas limitadas para comunidade</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Para manter a comunidade organizada e com suporte de qualidade, eu abro poucas vagas.
            Se você quer entrar e começar com orientação, fale comigo agora.
          </p>
          
          <Button
            text="OPERAR COM IA AGORA MESMO"
            onClick={handleJoinClick}
          />

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[ 
              'Você recebe as instruções no WhatsApp',
              'Você começa com o básico bem feito',
              'Você tira dúvidas direto comigo',
              'Você opera com mais clareza e método',
            ].map((t, idx) => (
              <div key={idx} className="flex items-start gap-2 rounded-2xl border border-gray-800 bg-nexus-card/60 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-nexus-green" />
                <div className="text-sm text-gray-300">{t}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-3xl mt-10">
          <div className="text-left">
            <h3 className="text-xl font-black">Perguntas frequentes</h3>
            <p className="mt-1 text-sm text-gray-400">Respostas rápidas para você decidir com segurança.</p>
          </div>

          <div className="mt-4 space-y-3 text-left">
            {[
              {
                q: 'Preciso de experiência para começar?',
                a: 'Não. Eu explico o passo a passo e te ajudo na configuração inicial pelo WhatsApp.'
              },
              {
                q: 'Funciona só pelo celular?',
                a: 'Sim. A proposta é ser prático e acessível, sem exigir computador.'
              },
              {
                q: 'Em quanto tempo eu consigo começar?',
                a: 'Geralmente em poucos minutos depois do nosso contato, dependendo do seu nível de familiaridade.'
              },
              {
                q: 'Existe garantia de lucro?',
                a: 'Não existe garantia. Resultados variam. O foco aqui é ter método, clareza e acompanhamento para você executar melhor.'
              },
            ].map((item, idx) => (
              <details key={idx} className="group rounded-2xl border border-gray-800 bg-nexus-card p-4">
                <summary className="cursor-pointer list-none font-bold text-gray-100 flex items-center justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-nexus-green group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-400 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-black py-8 border-t border-gray-900 text-center text-gray-600 text-xs px-4">
        <p className="mb-2">Nexus Trade IA &copy; {new Date().getFullYear()}</p>
        <p>
          Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. 
          Os resultados podem variar de pessoa para pessoa.
        </p>
      </footer>
    </div>
  );
}

export default App;