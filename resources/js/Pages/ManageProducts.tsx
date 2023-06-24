import { ChangeEvent, useState } from "react";
import { MdAdd, MdSend } from "react-icons/md";
import { router } from "@inertiajs/react";

import { Category, Product } from "@/types/app";

// Components
import ProductsTable from "@/Components/MyComponents/ProductsTable";
import DashboardMenu, { MenuOption } from "@/Components/MyComponents/DashboardMenu";
import Modal from "@/Components/MyComponents/Modal";
import TextInput from "@/Components/MyComponents/TextInput";
import DropDown from "@/Components/MyComponents/DropDown";
import PriceInput from "@/Components/MyComponents/PriceInput";

interface ManageProductsProps {
    products: Product[];
    categories: Category[];
    view: MenuOption;
}

interface ManageProductsState {
    name: string;
    category: string;
    price: number;
}

export default function ManageProducts({ products,categories, view }: ManageProductsProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [productState, setProductState] = useState<ManageProductsState>({
        name: "",
        category: categories[0].name,
        price: 10,
    });

    const handleModalClose = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const handleChangeState = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setProductState({
            ...productState,
            [e.target.id]: e.target.value,
        });
    };

    function handleSubmit () {
        const { name, category, price } = productState;
        const newProduct = {
            name,
            price,
            category_id: categories.find( c => category === c.name )?.id,
        }
        router.post("/products", newProduct);
        setModalIsOpen(false);
        setProductState({
            ...productState, name: ""
        })
    };

    return (
        <>
            <div
                className={`flex align-top justify-normal ${
                    modalIsOpen && "pointer-events-none"
                }`}
            >
                <DashboardMenu option={view} />
                <div className="flex-1 h-screen overflow-scroll">
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
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <h3 className="text-xl font-extrabold">Agregar un producto</h3>
                <TextInput
                    type="text"
                    value={productState.name}
                    name="name"
                    onChange={handleChangeState}
                    placeholder="Nombre"
                    label="Nombre"
                    required
                />
                <DropDown
                    name="category"
                    value={productState.category}
                    label="Categoria"
                    options={categories}
                    onChange={handleChangeState}
                />
                <PriceInput
                    name="price"
                    label="Precio"
                    value={productState.price}
                    placeholder="Precio"
                    onChange={handleChangeState}
                />
                <button
                    className="flex items-center justify-center w-20 p-3 text-xl text-white transition-all bg-black rounded-md ms-auto hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                    onClick={handleSubmit}
                >
                    <MdSend />
                </button>
            </Modal>
        </>
    );
}
