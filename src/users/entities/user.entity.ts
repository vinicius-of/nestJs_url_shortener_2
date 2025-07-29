import { User } from '@app/shared';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('varchar', {
        unique: true,
    })
    email: string;

    @Column('integer', {
        default: 0,
    })
    linksCount: number;

    @Column('varchar')
    name: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        update: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    updatedAt?: Date;
}
