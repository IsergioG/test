import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    postId:string
    @Column({type:'varchar',unique:true})
    title:string
    @Column({type:'int'})
    content:number
    @Column({type:'varchar'})
    likes:string
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    updatedAt:Date
    @Column({name: 'deletedAt',  default: null, nullable: true })
    deletedAt:Date
    @ManyToOne(()=>User,(user)=>user.userId)
    @JoinColumn({ name: 'userId' })
    user:User
}
