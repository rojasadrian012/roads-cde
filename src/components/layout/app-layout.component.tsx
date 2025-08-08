import React from "react";
import { Header } from "./header.component";
import { Toaster } from "@/components/ui/sonner"

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className='bg-white min-h-screen'>
            <Header />
            <main>
                {children}
            </main>
            <Toaster />
        </div>
    )
}