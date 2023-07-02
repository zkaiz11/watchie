export interface loginForm {
    username: string;
    password: string;
}
export interface registerForm {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface MovieInterface {
    id: number;
    title: string;
    desc: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    genre: string;
  }
  
export interface User {
    id: number;
    username: string;
    first_name: string | null;
    last_name: string | null;
    isAdmin: boolean;
    balance: number;
    favorite_movies: MovieInterface[]
}

export interface UserData {
    id: number;
    username: string;
    first_name: string | null;
    last_name: string | null;
    isAdmin: boolean;
    balance: number;
}

