import DashboardMenu, {
    MenuOption,
} from "@/Components/MyComponents/DashboardMenu";
import { Category } from "@/types/app";

export default function ManageCategories({
    categories,
    view,
}: {
    categories: Category[];
    view: MenuOption;
}) {
    return (
        <>
            <div
                className={`flex flex-col-reverse h-screen align-top md:w-full md:flex-row justify-normal`}
            >
                <DashboardMenu option={view} />
                <div className="flex-1">{categories.toString()}</div>
            </div>
        </>
    );
}
