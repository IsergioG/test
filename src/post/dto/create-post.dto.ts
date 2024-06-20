import { User } from "src/users/entities/user.entity"

export class CreatePostDto {
    title:string
    content:number
    likes:string
    createdAt:Date
    updatedAt:Date
    deletedAt:Date
    user:User
}
