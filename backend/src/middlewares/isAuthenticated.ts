import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface TokenPayload {
  sub: string
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      errorCode: "token.invalid",
    })
  }

  const [, token] = authToken.split(" ")

  try {
    // Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as TokenPayload

    // Recuperar o id do token e colocar dentro de uma variável dentro do '../@types/express/index.d.ts' request
    req.user_id = sub

    return next()
  } catch (err) {
    return res.status(401).json({
      errorCode: "token.expired",
    })
  }
}
