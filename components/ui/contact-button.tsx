"use client";

import { useContactPopup } from './contact-popup';

interface ContactButtonProps {
    className?: string;
    children: React.ReactNode;
}

export function ContactButton({ className = "", children }: ContactButtonProps) {
    const { openPopup } = useContactPopup();

    return (
        <button onClick={openPopup} className={className}>
            {children}
        </button>
    );
}
