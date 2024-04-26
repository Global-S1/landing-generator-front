import { ChangeEvent, useState } from 'react';

export const useForm = <T extends object>(initialForm: T) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onTextAreaChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [fileImg, setFileImg] = useState<File | null>(null)
    const [imgErrMsg, setImgErrMsg] = useState('')
    const onInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files

        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.includes('image')) {
                setImgErrMsg('Ingresa una imagen')

                setTimeout(() => {
                    setImgErrMsg('')
                }, 3000);
                return;
            }
            if (file instanceof Blob) {

                setFileImg(file)
            } else {
                // Manejar caso donde `files[0]` no es un objeto Blob
                console.error('El archivo seleccionado no es válido.');
            }
        } else {
            // Manejar caso donde no se selecciona ningún archivo
            console.warn('Ningún archivo seleccionado.');
        }
    }


    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        fileImg,
        imgErrMsg,
        formState,

        setImgErrMsg,
        onInputFileChange,
        onInputChange,
        onTextAreaChange,
        onResetForm,
    };
};