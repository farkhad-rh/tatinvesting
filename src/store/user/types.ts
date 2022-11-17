interface User {
  login: string | null
  password: string | null
}

type Actions = {
  createUser: (payload: User) => void
  deleteUser: () => void
}

export type { User, Actions }
