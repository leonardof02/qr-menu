import { Link } from "@inertiajs/react";
import { MdTableChart, MdCategory, MdPreview } from "react-icons/md";

export type MenuOption = "products" | "categories" | "preview" | "";
interface DashboardMenuProps {
    option: MenuOption;
}

function DashboardMenu({ option }: DashboardMenuProps) {
    return (
        <div className="flex flex-col h-screen shadow-md min-w-16 bg-slate-950">
            <Link
                href="/products"
                className={`flex items-center justify-center p-3 mx-2 my-1 text-3xl text-white
                            transition-colors rounded-sm hover:bg-white hover:text-black
                            ${option === "products" && "bg-white text-black"}`}
            >
                <MdTableChart />
            </Link>
            <Link
                href="/categories"
                className={`flex items-center justify-center p-3 mx-2 my-1 text-3xl text-white
                            transition-colors rounded-sm hover:bg-white hover:text-black
                            ${
                                option === "categories" && "bg-white text-black"
                            }`}
            >
                <MdCategory />
            </Link>
            <Link
                href="/preview"
                className={`flex items-center justify-center p-3 mx-2 my-1 text-3xl text-white
                            transition-colors rounded-sm hover:bg-white hover:text-black
                            ${
                                option === "preview" && "bg-white text-black"
                            }`}
            >
                <MdPreview />
            </Link>
        </div>
    );
}

export default DashboardMenu;
