import { TokenInfo } from "./ChallengeUser";
import { ApplicationUser } from "./UserAccount";


export class LoginRequest{
    userName?: string;
    password?: string;
}

export class LoginResponse {
    applicationUser?: ApplicationUser;
    tokenInfo?: TokenInfo;
}

export class RequestOTP {
    phoneNumber?: string;
    OTP?: string;
}

export class ValidateOTP {
    phoneNumber?: string;
    otp?: string;
}

export class UpdatePassword{
    userName?:string;
    phoneNumber?: string;
    otp?:string;
    password?:string
}

export class UserLogin {
   userName?:string;
}