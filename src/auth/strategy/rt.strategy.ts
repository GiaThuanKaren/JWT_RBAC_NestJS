import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        // config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: "rt-secret"
            // secretOrKey: config.get<string>('AT_SECRET'),
        });
    }

    

    // validate(req: Request, payload: any) {
        
    //     const refreshToken = req?.get('authorization')
    //         ?.replace('Bearer', '')
    //         .trim();
    //     return {
    //         ...payload,
    //         refreshToken,

    //     };
    // }
}
