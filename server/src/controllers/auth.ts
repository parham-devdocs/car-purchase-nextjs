import { Request, Response } from "express";
import { UserLogin, User } from "../types/user";
import { decodeJWT,generateAccessToken, generateRefreshToken } from "../utils/jwt";
import prisma from "../utils/prismaClient";
import { hash ,compare} from "../utils/hash"


export async function login(req: Request<any, any, UserLogin>, res: Response) {
  const { body } = req;

  try {
    // 1. Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: body.emailOrUsername },
          { email: body.emailOrUsername },
        ],
      },
    });

    // 2. Check if user exists
    if (!user) {
       res.status(401).json({ message: 'User does not exists' });
       return
    }

    // 3. Validate password
    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) {
     res.status(401).json({ message: 'Invalid credentials' });
     return
    }

    // 4. Generate tokens
    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());

    // 5. Save refresh token to the database
   const updatedUser= await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    res
    .cookie('accessToken', accessToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
     res
      .cookie('refreshToken', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ message:"login successful",accessToken});
  } catch (error) {
    console.error('Login error:', error);
     res.status(500).json({ message: 'Server error' });
     return
  }
}

export async function register(req: Request<any, any, User>, res: Response) {
  const { body } = req;

  console.log(body)
  const accessToken = generateAccessToken(body.username);
  const refreshToken = generateRefreshToken(body.username);
  const hashedPassword=await hash(body.password)


try {
  const existingUsername = await prisma.user.findFirst({where:{username:body.username}}) 
  const existingEmail=await prisma.user.findFirst ({where:{email:body.email}}) 
  const existingLicenceNumber=await prisma.user.findFirst({where:{licenceNumber:body.licenseNumber}})

  if (existingUsername || existingLicenceNumber || existingEmail) {
   res.status(409).json({error:"user already exists"})
   return
  }
 
  const newUser=await prisma.user.create({data:{
    username:body.username,
    phoneNumber:body.phoneNumber,
    password:hashedPassword,
    email:body.email,
    age:body.age,
    licenceNumber:body.licenseNumber,
    firstName:body.firstName,
    lastName:body.lastName,
     refreshToken:refreshToken,
     receiveEmails:body.receiveEmails
  }})
  res
  .cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  res.cookie("refreshToken",refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  .send({ message:"login successful"});
} catch (error) {
res.status(500).json({message:"server error"})
}

 
}

export async function auth(req: Request<any, any, User>, res: Response) {

  try {
    let userRole;
    console.log(req.headers.authorization)
    const userCookies=req.headers.authorization
    const token=userCookies?.substring(7)
    if (token) {
      const decodedToken= decodeJWT(token,"access") as string
      userRole=await prisma.user.findFirst({where:{id:+decodedToken},select:{role:true}})
  res.json({userRole:userRole?.role})
  return
    }
    throw new Error("no authorizaion header set")
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error})
  }

}
export async function logout(req: Request<any,any,User>, res: Response) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
       res.status(403).json({ message: "User not logged in" });
      return
    }

    // Decode the access token (make sure this returns the expected payload)
    const decodedToken = decodeJWT(accessToken, "access") as string
    if (!decodedToken) {
       res.status(401).json({ message: "Invalid access token" });
       return
    }

  const user = await prisma.user.findUnique({
    where: {username:decodedToken },
    // select: { refreshToken: true, id: true }, // Only get necessary fields
  });


    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    if (!user.refreshToken) {
       res.status(200).json({ message: "User already logged out" });
       return
    }

    const updatedUser = await prisma.user.update({
      where: { username:decodedToken },
      data: { refreshToken: null }, 
    });
res.clearCookie("accessToken")
     res.status(200).json({
      message: "User successfully logged out",
      updatedUser,
    });
    return
  } catch (error: any) {
    console.error("Logout error:", error);
   res.status(500).json({ message: "Internal server error", error: error.message });
   return
  }
}



export async function refreshToken(req: Request<any, any, User>, res: Response) {
  const refreshToken=req.cookies.refreshToken
  if (!refreshToken) {
    res.status(404).json({ message: "User not found" });
return
  }
  const user=await prisma.user.findFirst({where:{refreshToken},select:{username:true,refreshToken:true}})
  if (user && user?.refreshToken && user?.refreshToken===refreshToken) {
    const generatedAccessToken= generateAccessToken(user?.username)
    const generatedRefreshToken=generateRefreshToken(user.username)
    const updatedUser=await prisma.user.update({where:{username:user.username},data:{refreshToken:generatedRefreshToken}})
    res.cookie("accessToken", generatedAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.cookie("refreshToken",generatedRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.json({message:"refresh token and access token refreshedz",refreshToken:generatedRefreshToken})
  }

}