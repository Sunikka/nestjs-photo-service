import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    url: string;

    // Owner of the photo
    @ManyToOne(() => User, (user) => user.photos)
    user: User;

    @ManyToMany(() => Category, (category) => category.photos, {cascade: true})
    @JoinTable()
    categories: Category[]
}