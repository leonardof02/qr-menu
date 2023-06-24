import { ChangeEvent, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { router } from "@inertiajs/react"

import { Product } from "@/types/app";

interface ProductsTableProps {
    products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        setSelectedProducts(
            selectedProducts.includes(id)
                ? selectedProducts.filter(
                      (selectedProducts) => selectedProducts != id
                  )
                : [...selectedProducts, id]
        );
    };

    const onAllSelected = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedProducts(
            selectedProducts.length != products.length
                ? products.map((product) => product.id.toString())
                : []
        );
    };

    const handleDelete = (id: number) => {
        router.delete(`/products/${id}`);
    }

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
                                    selectedProducts.length == products.length
                                }
                            />
                        </th>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Precio ($)</th>
                        <th className="p-3">Opciones</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className={
                                selectedProducts.includes(product.id.toString())
                                    ? "divide-slate-300 bg-slate-200"
                                    : "divide-slate-300"
                            }
                        >
                            <td className="px-5 py-2 border">
                                <input
                                    type="checkbox"
                                    className="p-2 rounded-full checked:bg-slate-800"
                                    id={product.id.toString()}
                                    checked={selectedProducts.includes(
                                        product.id.toString()
                                    )}
                                    onChange={handleSelected}
                                />
                            </td>
                            <td className="px-5 py-2 border">{product.name}</td>
                            <td className="px-5 py-2 border">
                                {product.category.name}
                            </td>
                            <td className="px-5 py-2 border">
                                ${product.price}
                            </td>
                            <td className="px-5 py-2 border">
                                <div className="flex items-center gap-2 text-2xl justify-evenly">
                                    <button className="p-2 transition-all rounded-md hover:shadow-lg hover:cursor-pointer hover:-translate-y-1">
                                        <MdEdit />
                                    </button>
                                    <button onClick={ () => handleDelete( product.id ) } className="p-2 text-white transition-all rounded-md bg-slate-900 hover:shadow-lg hover:bg-slate-700 hover:cursor-pointer hover:-translate-y-1">
                                        <MdDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
