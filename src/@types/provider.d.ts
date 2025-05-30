interface ReducerObject {
  type: string
  payload: any
}

interface InitStateObject {
  loading: boolean
  showLoadingPage: boolean
  
  lang: string
  authToken: string
  verifyEmail: string

  userData: {
    email: string
    firstName: string
    lastName: string
    birthday: string,
    phoneNumber: string,
    image: string
  }
}

type GlobalContextType = [
  InitStateObject,

  {
    dispatch: (data: ReducerObject) => void
    setStore: (authToken: string) => void
  }
]