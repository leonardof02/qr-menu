// Const
export const NO_EVENT = () => {}

// Interfaces
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
    products?: Product[]
}

export interface ManageProductsState {
    name: string;
    category: string;
    price: number;
}

// Types
export type FormMode = "add" | "edit";

