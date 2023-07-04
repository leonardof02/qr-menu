import { MdSend } from "react-icons/md";

import { Category, ManageProductsState, NO_EVENT } from "@/types/app";

import TextInput from "./TextInput";
import DropDown from "./DropDown";
import PriceInput from "./PriceInput";
import { ChangeEvent } from "react";

interface ProductFormProps {
    product: ManageProductsState;
    categories: Category[];
    onSubmit?: () => void;
    onChange?: (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => void;
}

export default function ProductForm({product, onSubmit, categories, onChange }: ProductFormProps) {
    return (
        <>
            <TextInput
                type="text"
                value={product.name}
                name="name"
                onChange={onChange ? onChange : NO_EVENT}
                placeholder="Nombre"
                label="Nombre"
                required
            />
            <DropDown
                name="category"
                value={product.category}
                label="Categoria"
                options={categories}
                onChange={onChange ? onChange : NO_EVENT}
            />
            <PriceInput
                name="price"
                label="Precio"
                value={product.price}
                placeholder="Precio"
                onChange={onChange ? onChange : NO_EVENT}
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
