import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

 @Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId:string
    @Column({type:'varchar'})
    fullName:string
    @Column({type:'int'})
    age:number
    @Column({type:'varchar'})
    email:string
    @Column({type:'varchar'})
    password:string
    @OneToMany(()=>Post,(post)=>post.user)
    posts:User
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    updatedAt:Date
    @Column({name: 'deletedAt',  default: null, nullable: true })
    deletedAt:Date
}
