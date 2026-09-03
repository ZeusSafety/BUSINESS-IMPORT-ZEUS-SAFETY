'use client';

import { FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '51916532849';
const DEFAULT_MESSAGE =
  'Hola, deseo información sobre los productos de Zeus Safety.';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function openWhatsApp(text: string) {
  const msg = text.trim() || DEFAULT_MESSAGE;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function TypingMessage({ text, delay = 500 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      const t = setTimeout(() => setShowCursor(false), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 28);
    return () => clearTimeout(t);
  }, [displayed, text, started]);

  if (!started) {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
      </span>
    );
  }

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="ml-px inline-block h-[14px] w-[2px] animate-pulse bg-[#0b2d60]/60 align-middle" />
      )}
    </span>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (open && rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      openWhatsApp(message.trim() || DEFAULT_MESSAGE);
      setOpen(false);
      setMessage('');
    },
    [message],
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(340px,calc(100vw-2.5rem))] overflow-hidden border border-slate-200 bg-white shadow-[0_16px_40px_rgba(11,45,96,0.2)]"
            style={{ marginBottom: '7.5rem' }}
            role="dialog"
            aria-label="Chat WhatsApp"
          >
            <div className="flex items-center justify-between bg-[#0b2d60] px-4 py-3">
              <div>
                <p className="text-sm font-bold text-white">Atención en línea</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
                  En línea
                </p>
              </div>
              <button
                type="button"
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="space-y-3 bg-[#f4f6f9] px-4 py-4">
              <div className="max-w-[90%] border border-slate-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-[#0c1427]">
                <TypingMessage text="Hola. ¿Cómo podemos ayudarte?" delay={400} />
                <span className="mt-1.5 block text-[10px] text-slate-400">
                  Asesor · ahora
                </span>
              </div>
              <p className="text-center text-[10px] text-slate-400">
                Al enviar se abrirá WhatsApp con tu mensaje
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje…"
                className="h-10 min-w-0 flex-1 border border-slate-200 bg-white px-3 text-sm text-[#0c1427] outline-none placeholder:text-slate-400 focus:border-[#0b2d60]"
                aria-label="Mensaje para WhatsApp"
              />
              <button
                type="submit"
                aria-label="Enviar a WhatsApp"
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#25D366] text-white transition-transform hover:scale-105 hover:bg-[#20BA5A]"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Cerrar WhatsApp' : 'Abrir WhatsApp'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)]"
      >
        {!open && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            <span className="absolute -inset-1 animate-pulse rounded-full border-2 border-[#25D366]/35" />
          </>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <WhatsAppIcon className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
