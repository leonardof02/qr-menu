import { router, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useState } from "react";

import TextInput from "@/Components/TextInput";
import Alert from "@/Components/Alert";
interface AdminRegisterState {
    username: string,
    password: string
}

const initialState = {
    username: "",
    password: ""
}

export const Register = () => {
    
    const { errors } = usePage().props;
    const [ adminRegisterState, setAdminRegisterState ] = useState<AdminRegisterState>( initialState );
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setAdminRegisterState({...adminRegisterState, [e.target.name]: e.target.value})
    }

    function handleSubmit(e: FormEvent ) {
        e.preventDefault();
        router.post("/admin/register", {
            ...adminRegisterState
        })
    }

    return <>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Alert errors={ errors } />
            <form className="flex flex-col w-4/5 gap-4 p-10 shadow-xl md:w-96" onSubmit={ handleSubmit }>
                <h1 className="text-4xl font-extrabold">Registrar Admin</h1>
                <TextInput name="username" value={ adminRegisterState.username } onChange={ handleChange }
                            required type="text" label="Username"/>
                <TextInput name="password" value={ adminRegisterState.password } onChange={ handleChange }
                            required type="password" label="Contraseña"/>
                <input className="p-3 text-xl font-bold rounded-md cursor-pointer bg-neutral-900 text-neutral-100 hover:bg-neutral-700" type="submit" value="Register Admin"/>
            </form>
        </div>
    </>
};
export default Register;
