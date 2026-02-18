import { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('login');

    const openAuthModal = (initialMode = 'login') => {
        setMode(initialMode);
        setIsOpen(true);
    };

    const closeAuthModal = () => {
        setIsOpen(false);
    };

    return (
        <AuthModalContext.Provider value={{ isOpen, mode, setMode, openAuthModal, closeAuthModal }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => useContext(AuthModalContext);
