﻿import {IsEmail, IsNotEmpty, IsString} from "class-validator";

class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    firstname: string;
    @IsString()
    @IsNotEmpty()
    lastname: string;
    @IsString()
    @IsNotEmpty()
    friend_code: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    dob: Date;
}

export default CreateUserDto;