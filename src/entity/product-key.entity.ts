import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductKey {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name: 'active', default: true })
        active: boolean;

    @Column({ name: 'product_key' })
        productKey: string;

    @Column({ name: 'expires_on', type: 'timestamp' })
        expiresOn: string;

    @Column({ name: 'start_on', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        startOn: string;

    @Column({ name: 'generated_by' })
        generatedBy: string;

    @Column({ name: 'used_by' })
        usedBy: string;
}