import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones | Zeus Safety',
  description:
    'Libro de Reclamaciones Virtual de Zeus Safety, conforme al Código de Protección y Defensa del Consumidor.',
};

export default function ComplaintsBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
