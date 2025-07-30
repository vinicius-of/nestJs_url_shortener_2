import { Auth } from '@app/shared/contracts/auth.contract';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({
    name: 'auth',
})
export class AuthEntity implements Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        unique: true,
        primary: true,
    })
    email: string;

    @OneToOne(() => UserEntity, user => user.login)
    @JoinColumn()
    user: UserEntity;

    @Column({
        type: 'varchar',
    })
    @Exclude()
    password: string;

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
