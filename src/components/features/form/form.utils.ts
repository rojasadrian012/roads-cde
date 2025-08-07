export interface FormData {
    name: string;
    email: string;
    streetCode: string;
    proposedName: string,
    reason: string
}

export const emptyFormData: FormData = {
    name: '',
    email: '',
    streetCode: '',
    proposedName: '',
    reason: '',
}