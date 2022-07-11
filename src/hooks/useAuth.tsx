/* eslint-disable no-redeclare */
import React, { createContext, useContext, useEffect, useState } from 'react';

import EndpointService from '../services/Endpoint.service';
import { UserModel } from '../services/User.service';
import { RoutePaths } from '../types/RoutePaths.enum';
import { makeRequest } from '../services/Network.service';

interface AuthContextInterface {
  user: UserModel | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  shouldRedirect: () => [boolean, string | null];
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
    const response = await makeRequest<UserModel>(endpointService.signIn, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      })
    });

    if (response) {
      const userData = response as any;

      localStorage.setItem('user', JSON.stringify(response));
      setUser(userData);
    }
  };

  const signUp = async (email: string, password: string) => {
    const response = await makeRequest<UserModel>(endpointService.signUp, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      })
    });

    if (response) {
      const userData = response as any;

      localStorage.setItem('user', JSON.stringify(response));
      setUser(userData);
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('user');
    setUser(null);
  };

  function shouldRedirect(): [boolean, string | null] {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    if (user) {
      return [false, null];
    }

    return [true, RoutePaths.SIGNIN_ROUTE];
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut,
    shouldRedirect,
  };
};
