import {create} from 'zustand';
import { persist } from 'zustand/middleware';
enum Role {
  OWNER = "OWNER",
  DRIVER = "DRIVER"
}
export interface User {
  email: string,
  username: string,
  role: Role,
  contactPhone: string
}
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User
  login: (token: string) => void;
  logout: () => void;
  updateEmail: (newEmail:string) => void;
  setUser: (newUser: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: {
        email: "",
        username: "",
        role: Role.OWNER,
        contactPhone: ""
      },
      login: (token) => {
        set({ 
              token, 
              isAuthenticated: true,
            });
      },

      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
      updateEmail: (newEmail: string) => {
        set((state) => ({
          user: {
            ...state.user,
            email: newEmail,
          },
        }));
      },
      setUser: (newUser: User) =>{
        set({
          user: newUser
        })
      }
    }),
    {
      name: "auth-storage",
    }
  )
);

//funcion que devuelve el token, leo directo del localstorage sin depender 
// de si la store se cargo o no
//sirve para usarlo en el interceptor de axios q es algo q se ejecuta temprano
export const getToken = (): string | null => {
  const persisted = localStorage.getItem("auth-storage");
  if (!persisted) return null;
  const parsed = JSON.parse(persisted);
  return parsed.state.token;
};


  