import React from 'react';
import { supabase } from '#/supabase-client';
import type { Session } from '@supabase/supabase-js';

export interface UserCredentials {
    email   : string;
    password: string;
}

interface AuthContext {
    error  : Error | null;
    loading: boolean;
    session: Session | null;
    signUp : (userInput: UserCredentials) => Promise<void>;
    signIn : (userInput: UserCredentials) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = React.createContext<AuthContext>({
    error  : null,
    loading: true,
    session: null,
    signUp : async () => { throw new Error('AuthProvider not implemented') },
    signIn : async () => { throw new Error('AuthProvider not implemented') },
    signOut:       () => { throw new Error('AuthProvider not implemented') },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = React.useState(true);
    const [error,   setError  ] = React.useState<Error | null>(null);
    const [session, setSession] = React.useState<Session | null>(null);

    React.useEffect(() => {
        let isMounted = true;

        async function fetchSessionData() {
            setError(null);

            const { data, error } = await supabase.auth.getSession();
            if (error) setError(error);

            if (isMounted) {
                setSession(data?.session || null);
                setLoading(false);
            }
        }
        fetchSessionData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) setSession(session);
        });

        return () => { isMounted = false; subscription.unsubscribe() };
    }, []);

    async function performAuthAction(action: () => Promise<unknown>) {
        setError(null);
        try {
            const result = await action();
            setLoading(false);
            return result;
        } catch (error) {
            if (error instanceof Error) setError(error);
        }
    }

    async function signUp(userInput: UserCredentials) {
        await performAuthAction(async () => {
            const { data, error } = await supabase.auth.signUp(userInput);
            if (error) throw error;

            setSession(data?.session || null);
        });
    }

    async function signIn(userInput: UserCredentials) {
        await performAuthAction(async () => {
            const { data, error } = await supabase.auth.signInWithPassword(userInput);
            if (error) throw error;

            setSession(data?.session || null);
        });
    }

    async function signOut() {
        await performAuthAction(async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        });
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
