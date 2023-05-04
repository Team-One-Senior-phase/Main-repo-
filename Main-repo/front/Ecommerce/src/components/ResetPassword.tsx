import React, { useState, FormEvent } from 'react';

interface IUser {
    user_id: number
    user_name: string
    email: string
    password: string
    adress: string
}

interface Props {
    users: IUser[]
    userId:number
    getUserId: (mail: string) => void
    updatePassword: (id: number, newPassword: string) => void
}

const ResetPassword = ({ users, userId, getUserId, updatePassword }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleReset = (mail: string, password: string, confirm: string): string => {
        getUserId(mail)
        const exist = users.find((user) => user.email === mail)
        if (exist) {
            if (password === confirm) {
                updatePassword(userId, password)
                return ("password updated successfully")
            }
            else {
                return ("confirm password didn't match with the password")
            }
        }
        else {
            return ("invalid user")
        }
    }

    return (
        <div className="w-full max-w-xs mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-6 text-center">Reset Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={() => handleReset(email, password, confirmPassword)}
                    >
                        Reset Password
                    </button>
                </div>
                {handleReset(email, password, confirmPassword)==="password updated successfully"?<p style={{color:"green"}}>Password updated successfully</p>:""}
                {handleReset(email, password, confirmPassword)==="confirm password didn't match with the password"?<p style={{color:"red"}}>Confirm password didn't match with the password</p>:""}
                {handleReset(email, password, confirmPassword)==="invalid user"?<p style={{color:"red"}}>Invalid user</p>:""}
            </form>
        </div>
    );
}

export default ResetPassword;