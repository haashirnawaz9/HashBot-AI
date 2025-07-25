'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/ui/footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {children}
      {pathname !== '/chatbot' && <Footer />}
    </>
  );
}
