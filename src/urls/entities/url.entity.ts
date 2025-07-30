import { Url } from '@app/shared/contracts/url.contract';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'urls',
    orderBy: {
        clicks: 'DESC',
    },
})
export class UrlEntity implements Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        unique: true,
    })
    shortUrl: string;

    @Column('varchar')
    fullUrl: string;

    @Column('integer', {
        default: 0,
    })
    clicks: number;

    @ManyToOne(() => UserEntity, user => user.links)
    user?: UserEntity;

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

    @DeleteDateColumn({
        type: 'timestamptz',
        nullable: true,
        select: false,
    })
    @Exclude()
    removedAt?: Date;
}
