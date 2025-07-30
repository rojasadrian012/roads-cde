import type { GeoJsonFeature } from "./map.component.interfaces"


export const popupContent = (feature: GeoJsonFeature) => {
    return (`
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 5px;">
            ${
                feature.properties.BARRIO_NOM 
                ? 
                `<h3 style="margin: 0; font-size: 16px; color: #333;"><strong>Calle con nombre</strong></h3>
                <h4 style="margin: 5px 0 0; font-size: 14px; color: #555;">${feature.properties.NOMBRE}</h4>`
                :
                `<h3 style="margin: 0; font-size: 16px; color: #333;">Calle sin nombre, su código es:</h3>
                <h4 style="margin: 5px 0 0; font-size: 14px; color: #555;">${feature.properties.CODIGO_CAL}</h4>`
            }
        </div>
    `);
}
