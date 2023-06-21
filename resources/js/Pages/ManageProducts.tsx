import ProductsTable from "@/Components/ProductsTable";
import { Product } from "@/types/app";
import DashboardMenu, { MenuOption } from "@/Components/DashboardMenu";

export default function ManageProducts({ products, view }: { products: Product[], view: MenuOption }) {
    return (
        <div className="flex align-top justify-normal">
            <DashboardMenu option={view}/>
            <div className="flex-1">
                <h1 className="m-5 text-3xl font-extrabold text-center">Manejar Productos</h1>
                <ProductsTable products={products} />
            </div>
        </div>
    );
}
