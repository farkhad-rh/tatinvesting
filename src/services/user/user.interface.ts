export interface IUser {
  login: string | null
  password: string | null
  background?: boolean
}

export interface IUserActions {
  createUser: (payload: IUser) => void
  toggleBackground: (payload: IUser['background']) => void
  deleteUser: () => void
}
