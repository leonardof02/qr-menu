import ProductsTable from "@/Components/ProductsTable";
import { Product } from "@/types/app";

export default function AdminDashboard({ products }: { products: Product[]}) {

    console.log( products );

    return (
        <div>

            <ProductsTable products={products}/>
        </div>
    );
}
