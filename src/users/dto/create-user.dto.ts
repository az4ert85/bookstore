import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsJWT, IsOptional, IsString, Matches, MinDate, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    public email:string;

    @IsString()
    @MinLength(8)
     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/, {
    message:
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  public password:string;

  @IsOptional()
  @IsJWT()
  public refreshToken?:string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  public expireAt?:Date|null;

}
