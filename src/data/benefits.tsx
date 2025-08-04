import { MapPin, Edit3, Info, MousePointer2, Lightbulb, Clock } from "lucide-react";
import type { IBenefit } from "../types";
import imgageSteps from "../assets/images/no-image.png";
import { colors } from "../styles";

export const benefits: IBenefit[] = [
    {
        id: "how-work",
        title: "¿Cómo Funciona?",
        description: "Seleccioná una calle sin nombre en el mapa interactivo, obtené su código y proponé un nombre justificando tu elección. ¡Tu participación es fundamental!",
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
    {
        title: "Guía para tu Propuesta",
        description: "Sigue estos consejos y pasos para crear una propuesta exitosa que honre la historia y cultura local.",
        bullets: [
            {
                title: "Cómo empezar",
                description: (
                    <>
                        Haz clic en una calle <span className="text-primary font-semibold">naranja</span> (sin nombre) en el mapa para seleccionarla y completar el formulario.
                    </>
                ),
                icon: <MousePointer2 size={26} color={colors.primary} />,
            },
            {
                title: "Consejos para tu propuesta",
                description: "Considera la historia local, honra figuras importantes, piensa en la cultura del área y evita nombres duplicados.",
                icon: <Lightbulb size={26} color={colors.primary} />,
            },
            {
                title: "Proceso de revisión",
                description: "Tu propuesta será evaluada por el comité municipal y la comunidad local antes de la aprobación final.",
                icon: <Clock size={26} color={colors.primary} />,
            },
        ],
        imageSrc: imgageSteps,
    },
];