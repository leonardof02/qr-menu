import ProductsTable from "@/Components/ProductsTable";
import { Product } from "@/types/app";

export default function AdminDashboard({ products }: { products: Product[]}) {

    console.log( products );

    return (
        <div>
            <h1>AAAAAAAAAA</h1>
            <p>AdminDashboard Hello World</p>
            <ProductsTable products={products}/>
        </div>
    );
}
