import { useState, useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from 'usehooks-ts';

import Input from "../components/Input";
import { loginForm, registerForm } from "../type";
import axios from "axios";
import { baseURL } from "../api/api";
import useCurrentUser from "../hooks/useCurrentUser";

interface Props {
  isLogin: boolean,
}

const Auth: React.FC<Props > = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useLocalStorage('access_token', '')

  const [variant, setVariant] = useState("login");

  const clearForm = (): void => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }


  useEffect(() => {
    setError(null);
  }, [username, password])

  const toggleVariant = useCallback(() => {
    clearForm();
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = async (): Promise<void> => {
    const data: loginForm = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(`${baseURL}/auth/login`, data);
      setAccessToken(response.data.access_token)
    } catch (err) {
      const error = err as any;
      setError(error.response?.data?.message);
      console.log(error);
    }
  };
  const register = async(): Promise<void> => {
    const data: registerForm = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      };
      try {
        const response = await axios.post(`${baseURL}/auth/register`, data);
        setAccessToken(response.data.access_token)
      } catch (err) {
        const error = err as any;
        setError(error.response?.data?.message);
        console.log(error);
      }
  };

  if (isLogin) {
    return <Navigate to="/home" replace={true} />
  } else {
    return (
    <>
      <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/mlogo.png" className="h-12" alt="Logo" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              {error != null && (
                <div
                  className="animate-shaking flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">!</span> {error}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <Input
                  id="username"
                  type="username"
                  label="Username"
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                {variant === "register" && (
                  <Input
                    id="confirmPassword"
                    type="password"
                    label="Re-type Password"
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                  />
                )}
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              {/* <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div> */}
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Watchie?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );}
};

export default Auth;
