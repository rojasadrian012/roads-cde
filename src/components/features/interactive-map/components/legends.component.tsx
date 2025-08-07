import { streetColors } from "@/styles";

export const Legends: React.FC = () => {
    return (
        <div
            className="mb-4 p-4 border-2 rounded-lg"
            style={{ borderColor: streetColors.default }}
        >
            <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2">Leyenda:</h3>
            <div className="flex flex-wrap gap-4 text-base">
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: streetColors.default }}
                    ></div>
                    <span>Calles con nombre</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: streetColors.withoutName }}
                    ></div>
                    <span>Calles sin nombre</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: streetColors.found }}
                    ></div>
                    <span>Calle encontrada</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: streetColors.selected }}
                    ></div>
                    <span>Calle seleccionada</span>
                </div>
            </div>
        </div>
    );
};