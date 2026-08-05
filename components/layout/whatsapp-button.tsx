'use client';

import Image from 'next/image';
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Send, X } from 'lucide-react';

const WA_NUMBER = '51999999999';
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

function openWhatsApp(text: string) {
  const msg = text.trim() || DEFAULT_MESSAGE;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Hola');
  /** Solo la primera vez el hover abre el chat; tras cerrar, solo click */
  const allowHoverOpenRef = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  const closeAndLockHover = useCallback(() => {
    clearHoverClose();
    allowHoverOpenRef.current = false;
    setOpen(false);
  }, []);

  const onHoverEnter = useCallback(() => {
    clearHoverClose();
    if (allowHoverOpenRef.current) {
      setOpen(true);
    }
  }, []);

  const onHoverLeave = useCallback(() => {
    clearHoverClose();
    hoverCloseTimer.current = setTimeout(() => {
      setOpen(false);
    }, 280);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) closeAndLockHover();
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        open &&
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        closeAndLockHover();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
      clearHoverClose();
    };
  }, [open, closeAndLockHover]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    openWhatsApp(message.trim() ? message.trim() : DEFAULT_MESSAGE);
    closeAndLockHover();
  };

  const toggleByClick = () => {
    clearHoverClose();
    setOpen((prev) => {
      if (prev) {
        allowHoverOpenRef.current = false;
        return false;
      }
      return true;
    });
  };

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-[70]"
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <div
        className={`mb-3 w-[min(340px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-[#0b2d60]/10 bg-white shadow-[0_20px_50px_rgba(11,45,96,0.28)] transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
        role="dialog"
        aria-label="Chat Zeus Safety"
        aria-hidden={!open}
      >
        <div className="flex items-center gap-3 bg-[#0b2d60] px-4 py-3.5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#F5C400] bg-white">
            <Image
              src="/Logo de Zeus.png"
              alt=""
              fill
              className="object-contain p-1.5"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">Zeus Safety</p>
            <p className="flex items-center gap-1.5 text-[11px] text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              Asesor comercial · En línea
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar chat"
            onClick={closeAndLockHover}
            className="flex h-8 w-8 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-3 bg-[#eef2f7] px-4 py-4">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[#0c1427] shadow-sm">
            Hola 👋 ¿Cómo podemos ayudarte?
            <span className="mt-1 block text-[10px] text-slate-400">
              Asesor Zeus · ahora
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
            className="h-10 min-w-0 flex-1 border border-slate-200 bg-slate-50 px-3 text-sm text-[#0c1427] outline-none placeholder:text-slate-400 focus:border-[#0b2d60]/40 focus:bg-white"
            aria-label="Mensaje para WhatsApp"
          />
          <button
            type="submit"
            aria-label="Enviar a WhatsApp"
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#25D366] text-white transition-colors hover:bg-[#20BA5A]"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </form>
      </div>

      <button
        type="button"
        aria-label={open ? 'Cerrar WhatsApp' : 'Abrir WhatsApp'}
        aria-expanded={open}
        onClick={toggleByClick}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 hover:bg-[#20BA5A]"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <WhatsAppIcon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
