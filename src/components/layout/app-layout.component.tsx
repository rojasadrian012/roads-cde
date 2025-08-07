import React from "react";
import { Header } from "./header.component";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className='bg-white min-h-screen'>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}