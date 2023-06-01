import React from 'react';
import { AuthContext } from '#/context';

export function useAuth() {
    const authContext = React.useContext(AuthContext);
    if (!authContext) throw new Error(`'useAuth' can only be utilized within 'AuthContext.Provider'`);

    return authContext;
}
