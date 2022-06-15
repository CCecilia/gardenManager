import React, { createContext, useContext, useEffect, useState } from 'react';

import EndpointService from '../services/Endpoint.service';
import { UserModel } from '../services/User.service';
import axios from 'axios';
import { getHeaders } from '../services/Header.service';

interface AuthContextInterface {
  user: UserModel | null,
  signIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => void;
}


const AuthContext = createContext<AuthContextInterface | null>(null);

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const endpointService = new EndpointService();

  const signIn = async (email: string, password: string) => {
    console.log('signin useAuth', email, password);
    const response = await axios.post(
      endpointService.signIn,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: getHeaders(),
      }
    );

    if (response.data) {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('setting user data ', userData);
      setUser(userData);
    }
  };

  const signUp = async (email: string, password: string) => {
    const response = await axios.post(
      endpointService.signUp,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: getHeaders(),
      }
    );

    if (response.data) {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('setting user data ', userData);
      setUser(userData);
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    };
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut
  };
};