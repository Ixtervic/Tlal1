import ChatbotWidget from '@/components/ChatbotWidget'; //IMPORTANTE
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}

        {/* Chatbot flotante visible en todas las vistas que usan este layout */}
        <ChatbotWidget />
    </AppLayoutTemplate>
);
