import React, { useState } from 'react';
// @ts-ignore
import logo from '../assets/logo.png';
import { useForm } from "react-hook-form";

type LoginForm = {
    mail: string
    password: string
}

interface Props {
    loginUser: (mail: string, password: string) => void
    showInvalidUser: boolean
    getUserName: (mail: string) => void
    handleLogin:()=>void
}

const Login = ({ loginUser, showInvalidUser, getUserName, handleLogin }: Props) => {
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>()

    const onSubmit = (data: LoginForm) => {
        console.log(data)
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-blue-600">
                            <img src={logo} style={{ width: "160px", height: "160px" }} />
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("mail", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                />
                                {errors.mail && <p style={{ color: "red" }}>{errors.mail.message}</p>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                            </div>
                            <a
                                className="text-sm text-blue-700 hover:text-gray-900"
                                href="/resetPassword"
                            >
                                Forgot password
                            </a>
                        </div>
                        {showInvalidUser && <><br /><h4 style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>Invalid mail or password</h4></>}
                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="/register"
                            >
                                not registered?
                            </a>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                onClick={() => {loginUser(mail, password); getUserName(mail); handleLogin()}}>
                                Login
                            </button>
                        </div>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full" />
                            <p className="px-3 ">OR</p>
                            <hr className="w-full" />
                        </div>
                        <div className="my-6 space-y-2">
                            <button
                                aria-label="Login with Google"
                                type="button"
                                className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-5 h-5 fill-current"
                                >
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p>Login with Google</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

