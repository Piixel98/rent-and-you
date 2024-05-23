import React, { createContext, useState } from 'react';

interface SessionContextProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SessionContext = createContext<SessionContextProps>({
  loggedIn: true,
  setLoggedIn: () => {},
});

export const SessionProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <SessionContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};
