import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column()
        price: number;

    @ManyToMany(() => Category)
    @JoinTable({ name: 'product_category' })
        categories: Category[];
}