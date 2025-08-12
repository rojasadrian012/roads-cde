export const SECTION_IDS = {
    howWork: "how-work",
    guide: "guide",
    interactiveMap: "interactive-map",
    streetName: "street-name"
};

import type { IMenuItem } from "./types";

export const menuItems: IMenuItem[] = [
    {
        text: "¿Cómo Funciona?",
        url: `#${SECTION_IDS.howWork}`
    },
    {
        text: "Guía",
        url: `#${SECTION_IDS.guide}`
    },
    {
        text: "Mapa interactivo",
        url: `#${SECTION_IDS.interactiveMap}`
    },
    {
        text: "Proponer nombre",
        url: `#${SECTION_IDS.streetName}`
    }
];
