import DashboardMenu, { MenuOption } from "@/Components/DashboardMenu";
import { Category } from "@/types/app";

export default function ManageCategories({ categories, view }: { categories: Category[], view: MenuOption }) {
    return (
        <div className="flex align-top justify-normal">
            <DashboardMenu option={view}/>
            <div className="flex-1">
                { categories.toString() }
            </div>
        </div>
    );
}
