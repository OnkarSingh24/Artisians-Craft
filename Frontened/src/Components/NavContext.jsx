import React, { createContext, useState } from 'react';

// Create NavContext
export const NavContext = createContext();

// Create NavProvider component
export const NavProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user logged in

  return (
    <NavContext.Provider value={{ user, setUser }}>
      {children}
    </NavContext.Provider>
  );
};
