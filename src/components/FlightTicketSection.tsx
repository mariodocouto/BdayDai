import React, { useState } from 'react';
import { Plane, Calendar, Clock, MapPin, User, Ticket, QrCode, Sparkles, ZoomIn, X } from 'lucide-react';
import { SiteConfig } from '../config';

interface FlightTicketSectionProps {
  config: SiteConfig;
}

export const FlightTicketSection: React.FC<FlightTicketSectionProps> = ({ config }) => {
  const [isTicketImageOpen, setIsTicketImageOpen] = useState(false);
  const ticket = config.flightTicket;

  return (
    <section id="boarding-pass" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Luz ambiente dourada/vinho */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-[#521f37]/25 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Header Narrativo */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#271322]/80 border border-[#5a2745]/50 text-[#e4a4bd] text-xs uppercase tracking-widest mb-3">
          <Ticket className="w-3.5 h-3.5 text-[#e5779a]" />
          <span>A Promessa em Papel • Passagem Aérea</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold tracking-tight mb-4">
          “Dessa vez, a saudade tem destino.”
        </h2>
        <p className="text-base sm:text-lg text-[#d8b5c9] font-light leading-relaxed font-sans max-w-xl mx-auto">
          Tem coisas que a gente não consegue dizer em uma mensagem. Então a passagem já está emitida para te dizer olhando nos seus olhos.
        </p>
      </div>

      {/* Cartão do Cartão de Embarque (Boarding Pass) */}
      <div className="relative z-10 bg-[#1e0f1c] border-2 border-[#6d2f53]/70 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Top Ribbon de Companhia Aérea do Amor */}
        <div className="bg-gradient-to-r from-[#461730] via-[#642144] to-[#461730] px-6 py-4 flex items-center justify-between border-b border-[#732c54]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2d0f20] flex items-center justify-center text-[#fca9c4] border border-[#a13f6b]/50">
              <Plane className="w-4 h-4 fill-current transform -rotate-45" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#ffd1e1] font-mono font-semibold block">
                {ticket.airline}
              </span>
              <span className="text-[10px] text-[#caa1b7] tracking-wider">
                VOO OFICIAL DO REENCONTRO • CLASSE: {ticket.classType}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-[#fca9c4] bg-[#2a0e1e] px-3 py-1 rounded-full border border-[#5b2343]">
            <Sparkles className="w-3 h-3 text-[#ffb0cb]" />
            <span>CONFIRMADO</span>
          </div>
        </div>

        {/* Corpo Principal do Ticket */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Informações de Origem e Destino (8 colunas) */}
          <div className="md:col-span-8 space-y-6">
            {/* Trajeto com Códigos Aeroportuários */}
            <div className="flex items-center justify-between pb-6 border-b border-[#3b1932]">
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wider block">
                  {ticket.originCode}
                </span>
                <span className="text-xs text-[#caa1b7] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#e65c83]" />
                  {ticket.originCity} {ticket.originCountry}
                </span>
              </div>

              {/* Rota Central com Aviãozinho */}
              <div className="flex flex-col items-center px-4">
                <span className="text-[11px] font-mono text-[#fca9c4] tracking-wider mb-1">
                  {ticket.flightNumber}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#e65c83]"></div>
                  <div className="w-20 sm:w-32 h-0.5 bg-dashed border-b border-dashed border-[#8c355f]"></div>
                  <Plane className="w-4 h-4 text-[#fca9c4] transform rotate-90" />
                  <div className="w-20 sm:w-32 h-0.5 bg-dashed border-b border-dashed border-[#8c355f]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#e65c83]"></div>
                </div>
                <span className="text-[10px] text-[#a57f97] mt-1 font-mono">
                  ~8.150 KM SEM ESCALAS
                </span>
              </div>

              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wider block">
                  {ticket.destinationCode}
                </span>
                <span className="text-xs text-[#caa1b7] flex items-center justify-end gap-1 mt-0.5">
                  {ticket.destinationCity} {ticket.destinationCountry}
                  <MapPin className="w-3 h-3 text-[#e65c83]" />
                </span>
              </div>
            </div>

            {/* Grid de Dados: Passageiro, Data, Horário, Assento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a8829a] block mb-1">
                  Passageiro
                </span>
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#e65c83]" />
                  {ticket.passengerName}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a8829a] block mb-1">
                  Data de Chegada
                </span>
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#e65c83]" />
                  {ticket.date}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a8829a] block mb-1">
                  Horário Marcado
                </span>
                <span className="text-sm font-semibold text-[#fca9c4] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#fca9c4]" />
                  {ticket.arrivalTime}h
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a8829a] block mb-1">
                  Assento Especial
                </span>
                <span className="text-sm font-semibold text-[#ffd0e0] font-sans">
                  {ticket.seat}
                </span>
              </div>
            </div>
          </div>

          {/* Canhoto Perfurado / Código de Barras (4 colunas) */}
          <div className="md:col-span-4 md:border-l md:border-dashed border-[#4d213f] md:pl-6 flex flex-col items-center justify-center text-center pt-6 md:pt-0 border-t md:border-t-0 border-[#38162e]">
            {ticket.ticketImageUrl ? (
              <div
                className="relative group cursor-pointer rounded-xl overflow-hidden border border-[#7d325a] mb-3"
                onClick={() => setIsTicketImageOpen(true)}
              >
                <img
                  src={ticket.ticketImageUrl}
                  alt="Passagem Aérea Real"
                  className="w-40 h-28 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#140a13] border border-[#441b37] flex flex-col items-center mb-3">
                <QrCode className="w-16 h-16 text-[#e6759c] mb-2" />
                <span className="text-[10px] font-mono text-[#a8829a] tracking-widest uppercase">
                  LC2410-REENCONTRO
                </span>
              </div>
            )}

            <div className="text-xs text-[#caa1b7] font-serif italic max-w-[200px]">
              “Válido para um abraço que vai durar a vida inteira.”
            </div>

            {/* Código de barras estilizado */}
            <div className="mt-4 flex items-center justify-center gap-1 h-8 opacity-60">
              <span className="w-0.5 h-full bg-[#fca9c4]"></span>
              <span className="w-1 h-full bg-[#fca9c4]"></span>
              <span className="w-0.5 h-full bg-[#fca9c4]"></span>
              <span className="w-1.5 h-full bg-[#fca9c4]"></span>
              <span className="w-0.5 h-full bg-[#fca9c4]"></span>
              <span className="w-2 h-full bg-[#fca9c4]"></span>
              <span className="w-0.5 h-full bg-[#fca9c4]"></span>
              <span className="w-1 h-full bg-[#fca9c4]"></span>
              <span className="w-1.5 h-full bg-[#fca9c4]"></span>
              <span className="w-0.5 h-full bg-[#fca9c4]"></span>
              <span className="w-1 h-full bg-[#fca9c4]"></span>
            </div>
          </div>
        </div>

        {/* Nota Especial de Rodapé */}
        <div className="bg-[#170a15] px-6 py-3 border-t border-[#3b1932] text-center">
          <p className="text-xs text-[#d1adc1] font-sans font-light">
            {ticket.ticketNote}
          </p>
        </div>
      </div>

      {/* Modal para Visualizar a Foto Real da Passagem se fornecida */}
      {isTicketImageOpen && ticket.ticketImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsTicketImageOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#1b0e1a] p-4 rounded-3xl border border-[#6b2a50]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTicketImageOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#2a1324] text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={ticket.ticketImageUrl}
              alt="Passagem aérea oficial"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
