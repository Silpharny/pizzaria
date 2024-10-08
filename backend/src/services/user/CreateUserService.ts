import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // Verificar se enviou um email
    if (!email) {
      throw new Error("Email incorrect")
    }

    // Verificar se o email ja existe
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    // Criptografar a senha
    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: { name: name, email: email, password: passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  }
}

export { CreateUserService }
