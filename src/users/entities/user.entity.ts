import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Photo } from "src/photos/entities/photo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;


    @OneToOne(() => Profile, profile => profile.user, {eager: true})
    @JoinColumn()
    profile?: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    photos?: Photo[]
}