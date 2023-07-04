import { Category } from "@/types/app";
import { MdReceipt, MdRestaurantMenu } from "react-icons/md";

interface MenuViewProps {
    categories: Category[]
}

export const MenuView = ({ categories }: MenuViewProps) => {
    return (
        <div
            className="flex-1 min-h-screen p-8 overflow-scroll md:p-14 text-neutral-300 bg-neutral-900"
            style={{ fontFamily: "ShadowsIntoLight" }}
        >
            <h1 className="flex text-5xl font-extrabold mb-7">
                <MdRestaurantMenu />
                <MdReceipt />
                <span>Menu</span>
            </h1>
            {categories.map( category => {
                if (category.products?.length !== 0) {
                    return (
                        <div>
                            <h3 className="w-full py-2 mt-10 text-4xl font-bold border-b border-neutral-500">
                                {category.icon} {category.name}
                            </h3>
                            {category.products?.map((product) => (
                                <div className="flex justify-between mx-10 text-xl italic border-b-2 border-dotted border-neutral-300">
                                    <h4 className="box-content translate-y-1 border-4 border-neutral-900">
                                        {product.name}
                                    </h4>
                                    <p className="translate-y-1 border-4 border-neutral-900">
                                        ${product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default MenuView;
