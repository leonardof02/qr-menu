import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import {
    MdTableChart,
    MdCategory,
    MdPreview,
    MdMoreHoriz,
} from "react-icons/md";

export type MenuOption = "products" | "categories" | "preview" | "";

interface DashboardMenuProps {
    option: MenuOption;
}

function DashboardMenu({ option }: DashboardMenuProps) {
    const menuOptions: MenuOption[] = ["products", "categories", "preview"];
    const icons: Record<string, ReactNode> = {
        products: <MdTableChart />,
        categories: <MdCategory />,
        preview: <MdPreview />,
    };

    return (
        <div className="flex flex-col h-screen shadow-md min-w-16 bg-slate-950">
            {menuOptions.map((menuOption, index) => (
                <Link
                    href={`/${menuOption}`}
                    key={index}
                    className={`flex items-center justify-center p-3 mx-2 my-1 text-3xl
                            transition-colors rounded-sm hover:bg-white hover:text-black
                            ${
                                option === menuOption
                                    ? "text-black bg-white"
                                    : "text-white"
                            }`}
                >
                    {icons[menuOption]}
                </Link>
            ))}
            <Link
                href="/"
                className={`flex items-center justify-center p-3 mx-2 my-1 text-3xl text-white
                            transition-colors rounded-sm mt-auto`}
            >
                <MdMoreHoriz />
            </Link>
        </div>
    );
}

export default DashboardMenu;
