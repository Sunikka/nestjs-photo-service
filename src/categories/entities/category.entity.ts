import { Photo } from "src/photos/entities/photo.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;

    @ManyToMany(() => Photo, (photo) => photo.categories)
    photos : Photo[]

}