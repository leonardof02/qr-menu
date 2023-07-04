import { Category, NO_EVENT } from "@/types/app";
import { ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteFloatingButton from "./DeleteFloatingButton";


interface CategoriesTableProps {
    categories: Category[];
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    onBulkDelete?: (ids: number[]) => void;
}

export default function CategoriesTable({ categories, onDelete, onEdit, onBulkDelete }: CategoriesTableProps) {
    // TODO: Refactor this with hooks
    
    // State
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    // Functions
    const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const id = Number.parseInt(e.target.id);
        setSelectedCategories(
            selectedCategories.includes(id)
                ? selectedCategories.filter(
                      (selectedProducts) => selectedProducts != id
                  )
                : [...selectedCategories, id]
        );
    };

    const onAllSelected = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedCategories(
            selectedCategories.length != categories.length
                ? categories.map(( category ) => category.id)
                : []
        );
    };

    // Render
    return (
        <div className="items-center justify-center m-5 overflow-scroll rounded-md md:flex md:mx-20 md:my-5">
            <table className="w-full overflow-scroll text-left lg:min-w-2/3 whitespace-nowrap">
                <thead className="text-white uppercase divide-y-2 bg-slate-900">
                    <tr>
                        <th className="px-6 py-3">
                            <input
                                type="checkbox"
                                className="p-2 rounded-full checked:bg-slate-800"
                                onChange={onAllSelected}
                                checked={
                                    selectedCategories.length == categories.length
                                }
                            />
                        </th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Opciones</th>
                    </tr>
                </thead>
                <tbody className="">
                    {categories.map(category => (
                        <tr
                            key={category.id}
                            className={
                                selectedCategories.includes(category.id)
                                    ? "divide-slate-300 bg-slate-200"
                                    : "divide-slate-300"
                            }
                        >
                            <td className="px-5 py-2 border">
                                <input
                                    type="checkbox"
                                    className="p-2 rounded-full checked:bg-slate-800"
                                    id={category.id.toString()}
                                    checked={selectedCategories.includes(
                                        category.id
                                    )}
                                    onChange={handleSelected}
                                />
                            </td>
                            <td className="px-5 py-2 border">{ category.icon } {category.name}</td>
                            <td className="px-5 py-2 border">
                                <div className="flex items-center gap-2 text-2xl justify-evenly">
                                    <button
                                        onClick={
                                            onEdit
                                                ? () => onEdit(category.id)
                                                : NO_EVENT
                                        }
                                        className="p-2 transition-all rounded-md hover:shadow-lg hover:cursor-pointer hover:-translate-y-1"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={
                                            onDelete
                                                ? () => onDelete(category.id)
                                                : NO_EVENT
                                        }
                                        className="p-2 text-white transition-all rounded-md bg-slate-900 hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteFloatingButton
                isOpen={selectedCategories.length === 0 ? false : true}
                onClick={
                    selectedCategories.length !== 0 && onBulkDelete
                        ? () => {
                              onBulkDelete(selectedCategories);
                              setSelectedCategories([]);
                          }
                        : NO_EVENT
                }
            />
        </div>
    );
}