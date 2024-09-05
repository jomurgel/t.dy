import { Session, User } from '@supabase/supabase-js'

export type AuthContextType = {
    error: Error | null;
    loading: boolean;
    session: Session | null;
    signUpNewUser: (
        email: string,
        name: string,
        password: string,
    ) => Promise<void>;
    signInWithEmail: ( email: string, password: string ) => Promise<void>;
    signOut: () => Promise<void>;
    user: User | null;
};
