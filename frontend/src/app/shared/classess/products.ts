export interface Product {
    id?: number;
    name?: string;
    price?: number;
    salePrice?: number;
    discount?: number;
    pictures?: string;
    shortDetails?: string;
    description?: string;
    stock?: number;
    new?: boolean;
    sale?: boolean;
    category?: string;
    colors?: any[];
    size?: any[];
    tags?: any[];
    variants?: any[];
}

export interface ColorFilter {
    color?: any;
}

export interface TagFilter {
    tag?: any;
}