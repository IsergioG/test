import { Post } from "src/post/entities/post.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

 @Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId:string

    @Column({type:'varchar'})
    fullName:string

    @Column({type:'int'})
    age:number

    @Column({type:'varchar',unique:true})
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

    @Column({type:'boolean',nullable:true})
    sesion:boolean
}
