import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes';

//Додати інші вью в рендер та розробити інші компоненти юаю
const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
};

export default App;
