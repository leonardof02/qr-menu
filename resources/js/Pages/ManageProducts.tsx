import ProductsTable from "@/Components/MyComponents/ProductsTable";
import { Product } from "@/types/app";
import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import Modal from "@/Components/MyComponents/Modal";
import TextInput from "@/Components/MyComponents/TextInput";
import { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import DropDown from "@/Components/MyComponents/DropDown";

interface ManageProductsProps {
    products: Product[];
    // TODO categories: Category[];
    view: MenuOption;
}

export default function ManageProducts({
    products,
    view,
}: ManageProductsProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleModalClose = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value);

    return (
        <>
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <TextInput
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleNameChange}
                    placeholder="Nombre"
                    label="Nombre"
                ></TextInput>
                <DropDown name="category" label="Category" values={ products }>
            </Modal>
            <div
                className={`flex align-top justify-normal ${
                    modalIsOpen && "pointer-events-none"
                }`}
            >
                <DashboardMenu option={view} />
                <div className="flex-1">
                    <h1 className="m-5 text-3xl font-extrabold text-center">
                        Manejar Productos
                    </h1>
                    <ProductsTable products={products} />
                    <div className="flex items-center justify-center w-full text-lg">
                        <button
                            className="flex items-center justify-center p-3 text-white transition-all bg-black rounded-md hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                            onClick={openModal}
                        >
                            <MdAdd />
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
