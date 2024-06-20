import { IsDateString, IsNotEmpty, IsNumber, IsString,IsEmail } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty() 
    userId: string

    @IsString()
    @IsNotEmpty() 
    fullName: string

    @IsNumber()
    @IsNotEmpty() 
    age: number

    @IsEmail()
    @IsNotEmpty() 
    email: string

    @IsString()
    @IsNotEmpty() 
    password: string

    @IsDateString()
    @IsNotEmpty()
    createdAt: Date

    @IsDateString()
    @IsNotEmpty()
    updatedAt: Date
    
    @IsDateString()
    @IsNotEmpty()
    deletedAt: Date
}
