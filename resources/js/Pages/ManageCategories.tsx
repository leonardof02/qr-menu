import { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";

// My components
import Alert from "@/Components/Alert";
import Modal from "@/Components/Modal";
import CategoriesTable from "@/Components/CategoriesTable";
import DashboardMenu, { MenuOption, } from "@/Components/DashboardMenu";
import { Category, FormMode, ManageCategoryState } from "@/types/app";
import CategoryForm from "@/Components/CategoryForm";
import { Head, router, usePage } from "@inertiajs/react";

interface ManageCategoriesProps {
    categories: Category[];
    view: MenuOption;
}

const initialState = {
    name: "",
}

export default function ManageCategories({ categories, view }: ManageCategoriesProps) {

    // Handle errors
    const { errors } = usePage().props;

    const [ modalIsOpen, setModalIsOpen ] = useState<boolean>(false);
    const [ mode, setMode ] = useState<FormMode>("add");
    const [ idCategoryForEditing, setIdCategoryForEditing ] = useState<number | null>(null);
    const [ categoryState, setCategoryState ] = useState<ManageCategoryState>(initialState);

    // Functions
    const handleModalClose = () => setModalIsOpen(false);
    
    const openModalForAddingCategory = () => {
        setModalIsOpen(true);
        setMode("add");
    };
    
    const openModalForEditingCategory = (id: number) => {
        const category = categories.find( category => id === category.id);
        if ( category ) {
            const { name } = category;
            setCategoryState({
                name
            });
            setModalIsOpen(true);
            setMode("edit");
        }
        setIdCategoryForEditing(id);
    };

    const handleChangeState = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        setCategoryState({ ...categoryState, [e.target.id]: e.target.value });
    };

    // Submits
    const handleDeleteCategory = ( id: number ) =>
        router.delete(`/admin/categories/${id}`);

    function handleBulkDelete(ids: number[]) {
        router.post("/admin/categories/delete", { ids });
    }

    // Submit functions
    function addCategory() {
        setMode("add");
        const { name } = categoryState;
        const newCategory = {
            name,
        };

        router.post("/admin/categories", newCategory);
        setModalIsOpen(false);
        setCategoryState(initialState);
    }

    function handleEditCategory() {
        const { name } = categoryState;
        const newCategory = {
            name,
        };
        router.put(`/admin/categories/${idCategoryForEditing}`, newCategory);
        setModalIsOpen(false);
    }

    return (
        <>
            <Head title="Manejar Categorias"/>
            <div
                className={`flex flex-col-reverse h-screen align-top md:w-full md:flex-row justify-normal`}
            >
                <DashboardMenu option={view} />
                <div className="flex-1 h-screen overflow-scroll">
                    <h1 className="m-5 text-3xl font-extrabold text-center">
                        Manejar Categorias
                    </h1>
                    <Alert errors={ errors } />
                    <CategoriesTable
                        categories={ categories }
                        onBulkDelete={ handleBulkDelete }
                        onDelete={ handleDeleteCategory }
                        onEdit={ openModalForEditingCategory }
                        />
                    <div className="flex items-center justify-center w-full text-lg">
                        <button className="flex items-center justify-center p-3 mb-16 text-white transition-all bg-black rounded-md hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                                onClick={ openModalForAddingCategory }>
                            <MdAdd />
                            Agregar Categoria
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onClose={ handleModalClose }>
                <h3 className="text-xl font-extrabold">
                    {mode === "add" ? "Agregar Categoría" : "Editar Categoría"}
                </h3>
                <CategoryForm category={ categoryState }
                            onChange={ handleChangeState }
                            onSubmit={mode === "add" ? addCategory : handleEditCategory}
                />
            </Modal>
        </>
    );
}
