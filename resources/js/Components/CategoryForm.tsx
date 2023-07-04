import { Category, ManageCategoryState, NO_EVENT } from "@/types/app";
import { ChangeEvent } from "react";
import TextInput from "./TextInput";
import { MdSend } from "react-icons/md";

interface CategoryFormProps {
    category: ManageCategoryState;
    onSubmit?: () => void;
    onChange?: ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => void;
}

export default function CategoryForm({category, onSubmit, onChange }: CategoryFormProps) {
    return (
        <>
            <TextInput
                type="text"
                value={category.name}
                name="name"
                onChange={onChange ? onChange : NO_EVENT}
                placeholder="Nombre"
                label="Nombre"
                required
            />
            <button
                className="flex items-center justify-center w-20 p-3 text-xl text-white transition-all bg-black rounded-md ms-auto hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                onClick={onSubmit}
            >
                <MdSend />
            </button>
        </>
    );
}