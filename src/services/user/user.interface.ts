export interface IUser {
  login: string | null
  password: string | null
}

export interface IUserActions {
  createUser: (payload: IUser) => void
  deleteUser: () => void
}
