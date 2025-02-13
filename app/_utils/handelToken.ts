import { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import { serialize,} from "cookie"
import { cookies } from "next/headers";

type user = {email:string,username:string,id:number,isAdmin:boolean}


export  function handelToken(newUser: user) {
    const secretKey = process.env.JWT_SECRET_KEY as string;

    const token = jwt.sign(newUser, secretKey, { expiresIn: "7d" });
    const cookie = serialize("token", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
       maxAge: 60 * 60 * 24 * 7,
       path: "/",
     });
     
     console.log("oooooooooooooooooooo",cookie)
    return cookie
  
}

export function testUserToken (request:NextRequest){
    const cookies = request.cookies.get("token") as any;
    console.log("ccccccccccccccccccccccc",cookies)
    if (!cookies) return null
    const cookie = cookies.value;
    const testToken = jwt.verify(cookie, process.env.JWT_SECRET_KEY as string) as any;
    return testToken || null
}