import React, { useContext, useState } from 'react';
import { createContext, ReactNode } from 'react';
import * as Google from 'expo-auth-session';
import * as Apple from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userKey } from '../constants';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode
}

interface AuthorizationGoogleResponse {
  params: {
    access_token: string
  }
  type: string
}

interface GoogleUserScheme {
  email: string
  given_name: string
  family_name: string
  id: string
  picture: string
  locale: string
  name: string
  verified_email: boolean
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: User
  signInGoogle(): Promise<void>
  signInApple(): Promise<void>
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({} as User);

  const signInGoogle = async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const QUERY_STRING = `?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth${QUERY_STRING}`;

      const {type, params: { access_token }} = await Google.startAsync({
        authUrl
      }) as AuthorizationGoogleResponse;

      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
        const { email, id, given_name: name, picture: photo } = await response.json() as GoogleUserScheme;
        const userObject = {
          email,
          id,
          name,
          photo
        }
        setUser(userObject);
        await AsyncStorage.setItem(userKey, JSON.stringify(userObject));
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  const signInApple = async () => {
    try {
      const credentials = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.FULL_NAME,
          Apple.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credentials) {
        const userInfo = {
          id: String(credentials.user!),
          email: credentials.email!,
          name: credentials.fullName!.givenName!,
          photo: undefined
        };
        setUser(userInfo);
        await AsyncStorage.setItem(userKey, JSON.stringify(userInfo));
      }

    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInGoogle, signInApple }}>
			{children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
