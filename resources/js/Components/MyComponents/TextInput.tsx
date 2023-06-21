import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

interface TextInputProps {
    value: string;
    name: string;
    label?: string
    placeholder?: string;
    type: HTMLInputTypeAttribute;
    onChange: ( e: ChangeEvent<HTMLInputElement> ) => void
}

export default function TextInput({ type, value, name, placeholder, onChange, label }: TextInputProps) {

    const [ selected, setSelected ] = useState<boolean>(false);

    return <div className="flex flex-col">
        {label && <label htmlFor={name} className={`absolute px-2 mt-1 bg-white top-6 left-7 ${ selected ? "text-black" : "text-slate-600"  }`}>{ label }</label> }
        <input {...{type, value, name, placeholder, onChange}} id={name}
            className="p-4 border-opacity-100 rounded-lg border-1 border-slate-400 focus:outline-none focus:ring-0 focus:border-black"
            onFocus={ () => setSelected(true) }
            onBlur={ () => setSelected(false) }
            >
        </input>
    </div>
}
