export interface FormData {
    codigo: string;
    nombre: string;
    correo: string;
}

export const emptyFormData: FormData = {
    codigo: '',
    nombre: '',
    correo: ''
}