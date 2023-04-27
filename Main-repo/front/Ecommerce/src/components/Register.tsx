import React, { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

type RegistrationForm = {
    name: string
    mail: string
    password: string
    confirmPassword: string
}
interface IUser {
    user_name: string
    email: string
    password: string
}

interface Props {
    registerUser: (name: string, mail: string, password: string) => void
    users: IUser[]
}

const Register = ({ registerUser, users }: Props) => {
    const [name, setName] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm, setConfirm] = useState<string>("")
    const [showValid, setShowValid] = useState<boolean>(false)
    const [showInvalid, setShowInvalid] = useState<boolean>(false)
    const [validConfirmPass, setValidConfirmPass] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegistrationForm>()

    const confirmPassword = useWatch({ control, name: 'confirmPassword', defaultValue: '' })

    const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
        console.log(data)
    }

    var fetchUserAndAdd = (mail: string, users: IUser[]): void => {
        console.log(users)
        let temp = users.filter(user => user.email === mail)
        console.log(temp)
        if (temp.length === 0) {
            registerUser(name, mail, password)
            setShowValid(true)
            setShowInvalid(false)
        }
        else {
            setShowInvalid(true)
            setShowValid(false)
        }
    }

   var enableRegisterButton = (): void => {
    setValidConfirmPass(true)
    }

    return (
        <div onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <h5 className="text-2xl font text-black-300">
                        Enter your details to register
                    </h5>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    placeholder="enter your name here"
                                    id="name"
                                    {...register("name", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 6,
                                            message: "Username must be at least 6 characters",
                                        },
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                            </div>
                        </div>
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
                                    placeholder="enter your email here"
                                    id="email"
                                    {...register("mail", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)} />
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
                                    placeholder="enter your password here"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    placeholder="enter your password again"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) => value === password || 'Passwords do not match',
                                    })}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)} />
                                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                onClick={() => { fetchUserAndAdd(mail, users) }}>
                                Register
                            </button>
                        </div>
                        {showValid ? <><br /><h4 style={{ color: "green", textAlign: "center", fontWeight: "bold" }}>Account has been successfully registered!</h4></> : null}
                        {showInvalid ? <><br /><h4 style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>Email adress already used for an other account!</h4></> : null}
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-blue-600 hover:underline" href="/login">
                                Log in
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;