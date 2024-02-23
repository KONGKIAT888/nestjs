import { CategoryResponse } from '@payload/response/category.response';

export class ProductResponse {
    id: number;
    // name: string;
    // price: number;
    categories: CategoryResponse[];
}