import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import { Category } from "@/types/app";

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
                    className="flex-1 m-4 text-neutral-300"
                    style={{ fontFamily: "ShadowsIntoLight" }}
                >
                    {categories.map((category) => {
                        if (category.products?.length !== 0) {
                            return (
                                <div>
                                    <h3 className="w-full py-2 m-4 text-4xl font-extrabold border-b border-neutral-500">
                                        {category.icon} {category.name}
                                    </h3>
                                    {category.products?.map((product) => (
                                        <div className="flex justify-between mx-10 text-lg italic border-b-2 border-dotted border-neutral-300">
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
