import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId:string
    @Column({type:'varchar'})
    title:string
    @Column({type:'int'})
    content:number
    @Column({type:'varchar'})
    likes:string
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    updatedAt:Date
    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    deletedAt:Date
    @ManyToOne(()=>User,(user)=>user.userId)
    @JoinColumn({ name: 'userId' })
    user:User
}
