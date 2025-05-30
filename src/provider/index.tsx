import React, { useEffect } from 'react';
import { useReducer, useMemo } from "react";
import { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { restApi } from './restApi';
import { config } from '../config/config';
import { ValidateError } from '../services/customError';

const INIT_STATE: InitStateObject = {
  loading: false,
  showLoadingPage: true,

  lang: "en",
  authToken: "",
  verifyEmail: "",

  userData: {
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phoneNumber: "",
    image: ""
  }
}

// create context
const GlobalContext = createContext<any>({});
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => {
  // if (type === 'authToken') setStore(payload);
  return { ...state, [type]: payload };
}

// use contexts
function useGlobalContext() {
  return useContext(GlobalContext);
}

// setAuthToken to localstorage Start
const getStore = async (): Promise<string> => {
  try {
    const appKey = config.FRONTEND_URL + '-config';

    const authToken = await AsyncStorage.getItem(`${appKey}_authToken`);
    if (typeof authToken === 'string' && !!authToken) {
      return authToken;

    } else {
      throw new Error("Type Error!");
    }
  } catch (err) {
    return '';
  }
}

const setStore = async (authToken: string) => {
  try {
    const appKey = config.FRONTEND_URL + '-config';
    await AsyncStorage.setItem(`${appKey}_authToken`, authToken);
  } catch (err: any) {
    console.log("authToken_setStore_error::", err.message);
  }
}
// setAuthToken to localstorage End

const GlobalContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    initSessionSetting();
  }, [])

  const initSessionSetting = async () => {
    try {
      const authToken = await getStore();
      // console.log("authToken", authToken)

      if (!!authToken) {
        const loginStatus = await restApi.loginStatus(authToken);
        console.log("loginStatus", loginStatus);

        if (!!loginStatus?.status) {
          const userData = {
            email: loginStatus.email,
            firstName: loginStatus.firstName,
            lastName: loginStatus.lastName,
            birthday: loginStatus.birthday,
            phoneNumber: loginStatus.phoneNumber,
            image: loginStatus.image,
          }

          // console.log("userData::", userData)
          dispatch({ type: "authToken", payload: authToken });
          dispatch({ type: "userData", payload: userData });

          setTimeout(() => { dispatch({ type: "showLoadingPage", payload: false }) }, 1000);
        } else {
          throw new ValidateError("Invalid authToken!");
        }
      } else {
        throw new ValidateError("Invalid authToken!");
      }
    } catch (err: any) {
      // console.log("auth_token_invalid::", err.message);
      setTimeout(() => { dispatch({ type: "showLoadingPage", payload: false }) }, 1000);
    }
  }

  return (
    <GlobalContext.Provider
      value={useMemo(() => [
        state, { dispatch, setStore }
      ], [state])}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { useGlobalContext, GlobalContextProvider };