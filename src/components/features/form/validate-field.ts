export const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
        case 'streetCode':
            if (!value.trim()) {
                return 'Por favor, selecciona una calle sin nombre en el mapa';
            }
            break;
        case 'name':
            if (!value.trim()) {
                return 'El nombre es requerido';
            }
            if (value.trim().length < 2) {
                return 'El nombre debe tener al menos 2 caracteres';
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
                return 'El nombre solo puede contener letras y espacios';
            }
            break;
        case 'email':
            if (!value.trim()) {
                return 'El correo electrónico es requerido';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) {
                return 'Por favor, ingresa un correo electrónico válido';
            }
            break;
        case 'proposedName':
            if (!value.trim()) {
                return 'El nombre propuesto es requerido';
            }
            if (value.trim().length < 3) {
                return 'El nombre propuesto debe tener al menos 3 caracteres';
            }
            if (value.trim().length > 100) {
                return 'El nombre propuesto no puede exceder 100 caracteres';
            }
            break;
        case 'reason':
            if (!value.trim()) {
                return 'La razón o justificación es requerida';
            }
            if (value.trim().length < 20) {
                return 'La justificación debe tener al menos 20 caracteres';
            }
            if (value.trim().length > 1000) {
                return 'La justificación no puede exceder 1000 caracteres';
            }
            break;
    }
    return undefined;
};