interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const user = {
      name,
      email,
      password,
    }

    return user
  }
}

export { CreateUserService }
