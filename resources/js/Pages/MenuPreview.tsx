import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import { Category } from "@/types/app";
import { MdReceipt, MdRestaurantMenu, MdWater } from "react-icons/md";

interface MenuPreviewProps {
    categories: Category[];
    view: MenuOption;
}

export default function MenuPreview({ categories, view }: MenuPreviewProps) {
    return (
        <>
            <div className="flex flex-col-reverse h-screen align-top md:w-full md:flex-row justify-normal bg-neutral-800">
                <DashboardMenu option={view} />
                <div
                    className="flex-1 p-8 overflow-scroll md:p-14 text-neutral-300"
                    style={{ fontFamily: "ShadowsIntoLight" }}
                >
                    <h1 className="flex text-5xl font-extrabold mb-7">
                        <MdRestaurantMenu />
                        <MdReceipt />
                        <span>Menu</span>
                    </h1>
                    {categories.map((category) => {
                        if (category.products?.length !== 0) {
                            return (
                                <div>
                                    <h3 className="w-full py-2 mt-10 text-4xl font-bold border-b border-neutral-500">
                                        {category.icon} {category.name}
                                    </h3>
                                    {category.products?.map((product) => (
                                        <div className="flex justify-between mx-10 text-xl italic border-b-2 border-dotted border-neutral-300">
                                            <h4 className="box-content translate-y-1 border-4 border-neutral-800">
                                                {product.name}
                                            </h4>
                                            <p className="translate-y-1 border-4 border-neutral-800">
                                                ${product.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}
