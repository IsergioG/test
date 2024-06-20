import { User } from "src/users/entities/user.entity"

export class CreatePostDto {
    title:string
    content:string
    likes:number
    createdAt:Date
    updatedAt:Date
    deletedAt:Date
    user:User
}
