import Alert from "@/Components/Alert";
import TextInput from "@/Components/TextInput";
import { router, usePage } from "@inertiajs/react";
import { error } from "console";
import { ChangeEvent, FormEvent, useState } from "react";

interface AdminAuthState {
    username: string;
    password: string;
}

const initialState: AdminAuthState = {
    username: "",
    password: ""
}

export const AdminAuth = () => {

    const { errors } = usePage().props
    const [ adminAuthState, setAdminAuthState ] = useState<AdminAuthState>( initialState );
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setAdminAuthState({...adminAuthState, [e.target.name]: e.target.value})
    }

    function handleSubmit(e: FormEvent ) {
        e.preventDefault();
        router.post("/admin/auth", {
            ...adminAuthState
        })
    }
    
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <Alert errors={ errors } />
        <form className="flex flex-col w-4/5 gap-4 p-10 shadow-xl md:w-96" onSubmit={ handleSubmit }>
            <h1 className="text-4xl font-extrabold">Login para Admins</h1>
            <TextInput name="username" value={ adminAuthState.username } onChange={ handleChange }
                        required type="text" label="Username" placeholder="Nombre de usuario"/>
            <TextInput name="password" value={ adminAuthState.password } onChange={ handleChange }
                        required type="password" label="Contraseña" placeholder="Mas de 3 caracteres"/>
            <input className="p-3 text-xl font-bold rounded-md cursor-pointer bg-neutral-900 text-neutral-100 hover:bg-neutral-700" type="submit" value="Log in"/>
        </form>
    </div>;
};
export default AdminAuth;
