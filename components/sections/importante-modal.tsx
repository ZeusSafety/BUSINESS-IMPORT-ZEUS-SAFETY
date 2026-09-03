'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'zeus-importante-modal-dismissed';

export function ImportanteModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const target =
      document.getElementById('categorias-inicio') ||
      document.getElementById('nosotros');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Cerrar fondo"
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="¿Necesitas algo más?"
            className="relative z-10 w-full max-w-[min(560px,92vw)] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, scale: 0.72, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center bg-[#0b2d60] text-white shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60] sm:right-3 sm:top-3 sm:h-9 sm:w-9"
            >
              <X className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.5} />
            </button>

            <div className="relative w-full bg-[#0b2d60]">
              <Image
                src="/importante.png"
                alt="¿Necesitas algo más? Estamos para ayudarte — Zeus Safety"
                width={1401}
                height={1123}
                priority
                quality={90}
                sizes="(max-width: 560px) 92vw, 560px"
                className="h-auto w-full"
              />

              <a
                href="https://wa.me/51916532849"
                target="_blank"
                rel="noreferrer"
                className="absolute left-[4%] top-[46%] h-[8%] w-[48%]"
                aria-label="Escríbenos por WhatsApp"
              />
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="absolute left-[4%] top-[55%] h-[7%] w-[48%]"
                aria-label="Mira nuestro TikTok"
              />
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="absolute left-[4%] top-[63%] h-[7%] w-[48%]"
                aria-label="Síguenos en Facebook"
              />

              <Link
                href="/asesores"
                onClick={close}
                className="absolute bottom-[6%] left-[5%] h-[10%] min-h-[32px] w-[38%] max-w-[200px]"
                aria-label="Contáctanos"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
