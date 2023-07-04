import { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import { router } from "@inertiajs/react";

import { Category, FormMode, Product } from "@/types/app";
import { ManageProductsState } from "@/types/app";

// Components
import ProductsTable from "@/Components/MyComponents/ProductsTable";
import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import Modal from "@/Components/MyComponents/Modal";
import ProductForm from "@/Components/MyComponents/ProductForm";

interface ManageProductsProps {
    products: Product[];
    categories: Category[];
    view: MenuOption;
}

const initialState = {
    name: "",
    category: "",
    price: 10,
};

export default function ManageProducts({ products, categories, view }: ManageProductsProps) {
    
    // State
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<FormMode>("add");
    const [idProductForEditing, setIdProductForEditing] = useState<number | null>(null);
    const [productState, setProductState] = useState<ManageProductsState>({
        ...initialState,
        category: categories[0].name,
    });

    // Functions
    const handleModalClose = () => setModalIsOpen(false);

    const openModalForAddingProduct = () => {
        setModalIsOpen(true);
        setMode("add");
    };

    // 
    const openModalForEditingProduct = (id: number) => {
        const product = products.find((product) => id === product.id);
        if (product) {
            const { name, price, category } = product;
            setProductState({
                name,
                price,
                category: category.name,
            });
            setModalIsOpen(true);
            setMode("edit");
        }
        setIdProductForEditing(id);
    };

    const handleDeleteProduct = (id: number) =>
        router.delete(`/products/${id}`);

    function handleBulkDelete(ids: number[]) {
        router.post("/products/delete", { ids });
    }

    const handleChangeState = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setProductState({ ...productState, [e.target.id]: e.target.value });
    };

    // Submit functions
    function addProduct() {
        setMode("add");
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
            category: categories[0].name,
        });
    }

    function editProduct() {
        const { name, category, price } = productState;
        const newProduct = {
            name,
            price,
            category_id: categories.find((c) => category === c.name)?.id,
        };
        router.put(`/products/${idProductForEditing}`, newProduct);
        setModalIsOpen(false);
    }

    // Render
    return (
        <>
            <div
                className={`flex flex-col-reverse h-screen align-top md:w-full md:flex-row justify-normal
                ${modalIsOpen && "pointer-events-none"}`}
            >
                <DashboardMenu option={view} />
                <div className="flex-1 h-screen overflow-scroll">
                    <h1 className="m-5 text-3xl font-extrabold text-center">
                        Manejar Productos
                    </h1>
                    <ProductsTable
                        products={products}
                        onDelete={handleDeleteProduct}
                        onEdit={openModalForEditingProduct}
                        onBulkDelete={handleBulkDelete}
                    />
                    <div className="flex items-center justify-center w-full text-lg">
                        <button
                            className="flex items-center justify-center p-3 mb-16 text-white transition-all bg-black rounded-md hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                            onClick={openModalForAddingProduct}
                        >
                            <MdAdd />
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <h3 className="text-xl font-extrabold">
                    {mode === "add" ? "Agregar producto" : "Editar Producto"}
                </h3>
                <ProductForm
                    categories={categories}
                    product={productState}
                    onChange={handleChangeState}
                    onSubmit={mode === "add" ? addProduct : editProduct}
                />
            </Modal>
        </>
    );
}
