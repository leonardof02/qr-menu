import { NO_EVENT } from "@/types/app";
import { MouseEvent } from "react";
import { MdDelete } from "react-icons/md";

interface DeleteFloatingButtonProps {
    isOpen: boolean;
    onClick?: () => void;
}

export default function DeleteFloatingButton({ onClick, isOpen }: DeleteFloatingButtonProps) {
    return (
        <div className={`shadow-black flex hover:brightness-110 items-center transition-transform fixed text-lg text-white bg-red-600 rounded-xl top-5 right-0 ${!isOpen ? "translate-x-full" : "-translate-x-3"}`}>
            <button
                className="flex items-center w-full gap-2 p-3"
                onClick={onClick && (() => onClick())}
            >
                <MdDelete />
                <span>Eliminar Productos</span>
            </button>
        </div>
    );
}
