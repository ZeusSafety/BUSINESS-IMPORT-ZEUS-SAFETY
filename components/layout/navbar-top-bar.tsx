'use client';

import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const EMAIL = 'ventas@zeussafety.com';
const ADDRESS = 'Av. Industrial 123, Lima';
const HOURS = 'Lun – Sáb: 9:00 – 17:30';

const socials = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
];

const contactItems: {
  icon: typeof Mail;
  label: string;
  href?: string;
}[] = [
  {
    href: `mailto:${EMAIL}`,
    icon: Mail,
    label: EMAIL,
  },
  {
    icon: MapPin,
    label: ADDRESS,
  },
  {
    icon: Clock,
    label: HOURS,
  },
];

function ContactChip({
  href,
  icon: Icon,
  label,
  index,
}: {
  href?: string;
  icon: typeof Mail;
  label: string;
  index: number;
}) {
  const className =
    'group inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-white/90 transition-colors hover:text-[#F5C400]';

  const inner = (
    <>
      <Icon
        className="h-4 w-4 shrink-0 text-[#F5C400] transition-transform duration-200 group-hover:scale-110"
        strokeWidth={2}
      />
      <span>{label}</span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
      className="flex items-center"
    >
      {href ? (
        <a href={href} className={className}>
          {inner}
        </a>
      ) : (
        <span className={className}>{inner}</span>
      )}
    </motion.div>
  );
}

export function NavbarTopBar() {
  return (
    <div className="hidden border-b border-[#F5C400]/20 bg-[#0b2d60] lg:block">
      <div className="mx-auto flex h-11 max-w-[1600px] items-center justify-between gap-4 px-6 xl:px-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:scale-110 hover:border-[#F5C400] hover:bg-[#F5C400]/10 hover:text-[#F5C400]"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          ))}
        </motion.div>

        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1">
          {contactItems.map((item, index) => (
            <ContactChip
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
