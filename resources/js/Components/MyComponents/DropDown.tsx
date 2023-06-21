import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

interface TextInputProps {
    values: [],
    name: string;
    label?: string
    placeholder?: string;
    onChange: ( e: ChangeEvent<HTMLSelectElement> ) => void
}

export default function Dropdown({ name, values, label, onChange }: TextInputProps) {

    const [ selected, setSelected ] = useState<boolean>(false);

    return <div className="flex flex-col">
        {label && <label htmlFor={name} className={`absolute px-2 mt-1 bg-white top-6 left-7 ${ selected ? "text-black" : "text-slate-600"  }`}>{ label }</label> }
        <select name={name} id={name} onChange={onChange}>
            { values.map( value => <option>{value}</option> ) }
        </select>
    </div>
}
