import * as bcrypt from 'bcrypt';
import { ValidationException } from './ValidateExceptions';

export  function encodePassword(rawPassword:string){
    const SALT = bcrypt.genSaltSync();
    return  bcrypt.hashSync(rawPassword,SALT);
}

export function comparePasswords(rawPassword:string, hash: string){
    try {
        return bcrypt.compareSync(rawPassword, hash)
    } catch (error) {
        throw new ValidationException('WRONG_CREDENTIALS')
    }
    
}