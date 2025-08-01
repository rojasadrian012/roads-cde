import React from "react";

import { Header } from "./header.component";
import { HomePage } from "../../pages/home";


export const AppLayout: React.FC = () => {
    return (
        <div className='bg-white min-h-screen'>
            <Header />
            <main>
               <HomePage />
            </main>
        </div>
    )
}