import * as jose from 'jose';
export interface IPayload extends jose.JWTPayload {
  email: string;
  sub: string;
}
