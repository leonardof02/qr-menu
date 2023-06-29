import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode | ReactNode[];
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
    return <>
        { isOpen && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
                <div className="fixed inset-0 opacity-10 bg-slate-950"></div>
                <div className="absolute z-50 overflow-hidden bg-white border rounded-lg shadow-lg md:w-96">
                    <button
                        className="absolute top-0 right-0 px-4 py-1 text-white bg-black rounded-tr-lg hover:bg-slate-800"
                        onClick={onClose}
                    >
                        X
                    </button>
                    <div className="flex flex-col gap-5 p-4 mt-6">{children}</div>
                </div>
            </div>
        )}
    </>
}
