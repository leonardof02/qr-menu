import { ChangeEvent, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
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

    return (
        <div className="flex items-center justify-center p-5">
            <table className="w-full text-center md:w-3/6">
                <thead>
                    <tr className="m-10">
                        <th>
                            <input
                                type="checkbox"
                                name=""
                                id=""
                                onChange={onAllSelected}
                                checked={
                                    selectedProducts.length == products.length
                                }
                            />
                        </th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Precio ($)</th>
                        <th>Opciones</th>
                    </tr>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className={
                                selectedProducts.includes(product.id.toString())
                                    ? "bg-slate-200"
                                    : ""
                            }
                        >
                            <td className="p-4 m-2">
                                <input
                                    type="checkbox"
                                    id={product.id.toString()}
                                    checked={selectedProducts.includes(
                                        product.id.toString()
                                    )}
                                    onChange={handleSelected}
                                />
                            </td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.category.name}</td>
                            <td className="p-2">${product.price}</td>
                            <td>
                                <div className="flex items-center justify-center gap-2 text-white">
                                    <button className="p-2 bg-blue-700">
                                        {" "}
                                        <MdEdit />{" "}
                                    </button>
                                    <button className="p-2 bg-red-600">
                                        {" "}
                                        <MdDelete />{" "}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </thead>
            </table>
            ;
        </div>
    );
}
