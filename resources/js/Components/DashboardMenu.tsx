import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import {
    MdTableChart,
    MdCategory,
    MdPreview,
    MdMoreHoriz,
    MdQrCode
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
        <div className="flex flex-row w-screen p-1 shadow-md md:h-screen md:w-fit md:flex-col bg-slate-950">
            {menuOptions.map((menuOption, index) => (
                <Link
                    href={`/admin/${menuOption}`}
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
                            transition-colors rounded-sm ms-auto md:mt-auto`}
            >
                <MdQrCode />
            </Link>
        </div>
    );
}

export default DashboardMenu;
