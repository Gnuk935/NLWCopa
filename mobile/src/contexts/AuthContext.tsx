import { createContext, ReactNode, useState, useEffect } from "react";
import *  as Google from  'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();// GARANTE O REDIRECIONAMENTO

interface UserProps{
    //Interface do user
    name: string;
    avatarUrl: string;
}

interface AuthProviderProps{
    children: ReactNode;
}

export interface AuthContextDataProps{
    user: UserProps;
    isUserLoading: boolean;
    singIn: () => Promise<void>;
}

export const AuthContext = createContext({/* obj vazio */} as AuthContextDataProps);

export function AuthContextProvider( { children } : AuthProviderProps ){

    const [user, setUser] = useState<UserProps>({} as UserProps);


    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId:'869906798866-nt6gqb03pj7irdnmqa48qo4r4vq4kbt3.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes:['profile', 'email']
    })

    async function singIn() {
        try {
            console.log('Ai qui dilicia == iniciando login');
            setIsUserLoading(true);
            await promptAsync(); //começa autenticação

        } catch (error) {
            console.log(error)
            throw error;
        }finally{
            console.log('CAVALO == sucesso')
            setIsUserLoading(false);
        }
    }

    async function singInWithGoogle(acess_token:string) {
        console.log("QUE ISSO MEU FILHO CALMA ==>",acess_token);
    }

    useEffect(() =>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            singInWithGoogle(response.authentication.accessToken)
        }
    },[response])

    return(
        <AuthContext.Provider value={{
            singIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}