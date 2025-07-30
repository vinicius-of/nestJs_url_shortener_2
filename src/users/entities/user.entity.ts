import { User } from '@app/shared';
import { Auth } from '@app/shared/contracts/auth.contract';
import { Url } from '@app/shared/contracts/url.contract';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { UrlEntity } from 'src/urls/entities/url.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'users',
})
export class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('varchar', {
        unique: true,
    })
    email: string;

    @OneToOne(() => AuthEntity, auth => auth.user)
    login?: AuthEntity;

    @OneToMany(() => UrlEntity, url => url.user)
    links?: UrlEntity;

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
    createdAt?: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    updatedAt?: Date;
}
