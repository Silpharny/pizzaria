import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"

interface UserRequest {
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: UserRequest) {
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error("User or password incorrect")
    }

    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("User or password incorrect")
    }

    // Gerar o token JWT e retornar os dados do usuário como id, name e email
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    }
  }
}

export { AuthUserService }
