import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, isNotEmpty, isString } from "class-validator"

export class CreateAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string 

}
