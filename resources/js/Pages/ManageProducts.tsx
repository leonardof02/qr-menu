import ProductsTable from "@/Components/MyComponents/ProductsTable";
import { Category, Product } from "@/types/app";
import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import Modal from "@/Components/MyComponents/Modal";
import TextInput from "@/Components/MyComponents/TextInput";
import { ChangeEvent, useState } from "react";
import { MdAdd, MdSend } from "react-icons/md";
import DropDown from "@/Components/MyComponents/DropDown";
import PriceInput from "@/Components/MyComponents/PriceInput";
import { router } from "@inertiajs/react";

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
    const [category, setCategory] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<number>(10);

    // TODO: Refactor this
    const handleModalClose = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
        setProductName(e.target.value);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setCategory(e.target.value);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = value.replace(/[,]/g, ".");
        if (formattedValue.match(/^\d+(\.\d{0,2})?$/))
            setPrice(Number.parseFloat(e.target.value));
    };

    const handleSubmit = () => {
        router.post("/products", {
            productName,
            category,
            price,
        });
    };

    return (
        <>
            <Modal isOpen={modalIsOpen} onClose={handleModalClose}>
                <form>
                    <h3 className="text-xl font-extrabold">
                        Agregar un producto
                    </h3>
                    <TextInput
                        type="text"
                        value={productName}
                        name="name"
                        onChange={handleNameChange}
                        placeholder="Nombre"
                        label="Nombre"
                        required
                    />
                    <DropDown
                        name="category"
                        label="Categoria"
                        options={categories}
                        onChange={handleCategoryChange}
                        value={category}
                    />
                    <PriceInput
                        name="price"
                        label="Precio"
                        value={price}
                        placeholder="Precio"
                        onChange={handlePriceChange}
                    />
                    <button
                        className="flex items-center justify-center w-20 p-3 text-xl text-white transition-all bg-black rounded-md ms-auto hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                        onClick={handleSubmit}
                    >
                            <MdSend />
                    </button>
                </form>
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
