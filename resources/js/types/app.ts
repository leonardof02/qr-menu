export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
}

export interface Category {
    id: number,
    name: string,
    icon?: string
}
