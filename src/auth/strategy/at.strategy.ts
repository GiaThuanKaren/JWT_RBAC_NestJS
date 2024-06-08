import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";

type JWtPayload = {
    sub: string,
    email: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "at-secret"
            // secretOrKey: config.get<string>('AT_SECRET'),
        })
    }

    validate(payload: any) {
        return payload;
    }
}
