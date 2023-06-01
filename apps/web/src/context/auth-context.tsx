import React from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '#/supabase-client';

interface AuthContext {
    error: Error | null;
    loading: boolean;
    session: Session | null;
    signUp: (userInput: UserCredentials) => Promise<void>;
    signIn: (userInput: UserCredentials) => Promise<void>;
    signOut: () => void;
};

export interface UserCredentials {
    email: string;
    password: string;
};

export const AuthContext = React.createContext<AuthContext>({
    error: null,
    loading: true,
    session: null,
    signUp: async () => {},
    signIn: async () => {},
    signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [session, setSession] = React.useState<Session | null>(null);

    React.useEffect(() => {
        async function fetchSessionData() {
            setError(null);

            const { data, error } = await supabase.auth.getSession();
            if (error) setError(error);

            setSession(data?.session || null);
            setLoading(false);
        }
        fetchSessionData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session) });

        return () => subscription.unsubscribe();
    }, []);

    async function signUp(userInput: UserCredentials) {
        setError(null);

        const { data, error } = await supabase.auth.signUp(userInput);
        if (error) setError(error);

        setSession(data?.session || null);
        setLoading(false);
    }

    async function signIn(userInput: UserCredentials) {
        setError(null);
        
        const { data, error } = await supabase.auth.signInWithPassword(userInput);
        if (error) setError(error);
        
        setSession(data?.session || null);
        setLoading(false);
    }
    
    async function signOut() {
        setError(null);

        const { error } = await supabase.auth.signOut();
        if (error) setError(error);
        
        setLoading(false);
    }

    const value = {
        error,
        loading,
        session,
        signUp,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
