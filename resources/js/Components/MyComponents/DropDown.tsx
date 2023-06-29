import { Category, Product } from "@/types/app";
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

interface TextInputProps {
    options: Category[],
    name: string;
    value: string;
    label?: string;
    placeholder?: string;
    onChange: ( e: ChangeEvent<HTMLSelectElement> ) => void
}

export default function Dropdown({ name, value, options, label, onChange }: TextInputProps) {

    const [ selected, setSelected ] = useState<boolean>(false);

    return <div className="flex flex-col">
        {label && <label htmlFor={name} className={`absolute px-2 mt-1 bg-white -translate-y-4 translate-x-3 ${ selected ? "text-black" : "text-slate-600"  }`}>{ label }</label> }
        <select name={name} id={name} onChange={onChange} value={ value }
                className="p-4 border-opacity-100 rounded-lg border-1 border-slate-400 focus:outline-none focus:ring-0 focus:border-black">
            { options.map( option => <option key={ option.id }>{option.name}</option> ) }
        </select>
    </div>
}