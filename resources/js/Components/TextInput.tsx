import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

interface TextInputProps {
    value: string;
    name: string;
    label?: string
    placeholder?: string;
    type: HTMLInputTypeAttribute;
    onChange: ( e: ChangeEvent<HTMLInputElement> ) => void
    required: boolean
}

export default function TextInput({ type, required, value, name, placeholder, onChange, label }: TextInputProps) {

    const [ selected, setSelected ] = useState<boolean>(false);

    return <div className="flex flex-col">
        {label && <label htmlFor={name} className={`absolute px-2 mt-1 bg-white -translate-y-4 translate-x-3 ${ selected ? "text-black" : "text-slate-600"  }`}>{ label }</label> }
        <input {...{type, value, name, placeholder, onChange, required}} id={name}
            className="p-3 border-opacity-100 rounded-lg border-1 border-slate-400 focus:outline-none focus:ring-0 focus:border-black"
            onFocus={ () => setSelected(true) }
            onBlur={ () => setSelected(false) }
            >
        </input>
    </div>
}
