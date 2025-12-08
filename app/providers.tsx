"use client";

import { ReactNode } from 'react';
import { ContactPopupProvider } from '@/components/ui/contact-popup';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ContactPopupProvider>
            {children}
        </ContactPopupProvider>
    );
}
