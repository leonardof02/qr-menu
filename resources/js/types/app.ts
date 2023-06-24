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

export interface ManageProductsState {
    name: string;
    category: string;
    price: number;
}

export const NO_EVENT = () => {}
