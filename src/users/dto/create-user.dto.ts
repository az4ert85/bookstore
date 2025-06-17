import { IsDate, IsDateString, IsEmail, IsJWT, IsString, Matches, MinLength } from "class-validator";

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

  @IsJWT()
  public refreshToken:string;

  @IsDate()
  public expireAt:Date;

}
