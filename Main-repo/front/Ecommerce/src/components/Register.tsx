import React, { useState } from 'react';

interface Props {
    registerUser: (name: string, mail: string, password: string) => void
}

const Register = ({ registerUser }: Props) => {
    const [name, setName] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm, setConfirm] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [validPass, setValidPass] = useState<boolean>(false)

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        let new_pass = event.target.value;
        setPassword(new_pass);

        // regular expressions to validate password
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if (!new_pass.match(lowerCase)) {
            setPasswordError("Password should contains lowercase letters!")
            setValidPass(false)
        } else if (!new_pass.match(upperCase)) {
            setPasswordError("Password should contain uppercase letters!")
            setValidPass(false)
        } else if (!new_pass.match(numbers)) {
            setPasswordError("Password should contains numbers also!")
            setValidPass(false)
        } else if (new_pass.length < 8) {
            setPasswordError("Password length should be more than 8!")
            setValidPass(false)
        } else {
            setPasswordError("Password is strong!")
            setValidPass(true)
        }
    }

    return (
        <div>
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
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
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
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)} />
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
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </div>
                            {passwordError === "Password is strong!" ? <p style={{ color: "green" }}> {passwordError} </p>
                                : <p style={{ color: "red" }}> {passwordError} </p>}
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
                                    name="password_confirmation"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                onClick={() => registerUser(mail, name, password)}>
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-blue-600 hover:underline" href="#">
                                Log in
                            </a>
                        </span>
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
                </div>
            </div>
        </div>
    );
}
export default Register;