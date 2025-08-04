import { MapPin, Edit3, Info } from "lucide-react";
import type { IBenefit } from "../types";
import imgageSteps from "../assets/images/steps.webp";
import { colors } from "../styles";

export const benefits: IBenefit[] = [
    {
        title: "¿Cómo Funciona?",
        description:
            "Seleccioná una calle sin nombre en el mapa interactivo, obtené su código y proponé un nombre justificando tu elección. ¡Tu participación es fundamental!"
        ,
        bullets: [
            {
                title: "Explorá el mapa",
                description: (
                    <>
                        Las calles sin nombre están en color{" "}
                        <span className="text-primary font-bold">naranja</span>. Hacé clic en una para ver su código.
                    </>
                ),
                icon: <MapPin size={26} color={colors.primary} />,
            },
            {
                title: "Completá el formulario",
                description: "Ingresá tus datos, el código de la calle y el nombre que proponés.",
                icon: <Edit3 size={26} color={colors.primary} />,
            },
            {
                title: "Consultá nombres ya existentes",
                description: "Evitá duplicados revisando el listado disponible desde el ícono de información.",
                icon: <Info size={26} color={colors.primary} />,
            },
        ],
        imageSrc: imgageSteps,
    },
];
