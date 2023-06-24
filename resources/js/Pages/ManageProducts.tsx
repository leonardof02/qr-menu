import { ChangeEvent, useState } from "react";
import { MdAdd, MdSend } from "react-icons/md";
import { router } from "@inertiajs/react";

import { Category, Product } from "@/types/app";
import { ManageProductsState } from "@/types/app";

// Components
import ProductsTable from "@/Components/MyComponents/ProductsTable";
import DashboardMenu, { MenuOption } from "@/Components/MyComponents/DashboardMenu";
import Modal from "@/Components/MyComponents/Modal";
import AddProductForm from "@/Components/MyComponents/AddProductForm";

interface ManageProductsProps {
    products: Product[];
    categories: Category[];
    view: MenuOption;
}

export default function ManageProducts({
    products,
    categories,
    view,
}: ManageProductsProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [productState, setProductState] = useState<ManageProductsState>({
        name: "",
        category: categories[0].name,
        price: 10,
    });

    const handleModalClose = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const handleChangeState = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        setProductState({
            ...productState,
            [e.target.id]: e.target.value,
        });
    };

    function handleSubmit() {
        const { name, category, price } = productState;
        const newProduct = {
            name,
            price,
            category_id: categories.find((c) => category === c.name)?.id,
        };
        router.post("/products", newProduct);
        setModalIsOpen(false);
        setProductState({
            ...productState,
            name: "",
        });
    }

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
                <AddProductForm
                    categories={categories}
                    handleChange={handleChangeState}
                    product={productState}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </>
    );
}
