import React from "react";

export const LazyInteractiveMap = React.lazy(() =>
    import("./interactive-map/interactive-map.component").then(module => ({
        default: module.InteractiveMap
    }))
)

export const LazyForm = React.lazy(() =>
    import("./form/form.component").then(module => ({
        default: module.Form
    }))
)