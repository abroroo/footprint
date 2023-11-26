import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Sign in with your Password and Email</h1>
                            </div>
                            <div className="divide-y divide-slate-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-slate-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input autocomplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-slate-300 text-slate-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label for="email" className="absolute left-0 -top-3.5 text-slate-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-slate-300 text-slate-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label for="password" className="absolute left-0 -top-3.5 text-slate-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <Link to='/'>
                                            <button className="bg-dark-green text-white rounded-md px-2 py-1">Sign In</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link className='absolute right-10 bottom-5 text-blue-500 hover:opacity-75' to='/'>&#8592; Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn