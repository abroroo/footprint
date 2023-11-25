import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import Button from '../Button/Button'
const Header = () => {
    return (
        <nav className='flex items-center justify-between container mx-auto px-5 py-5'>
            <div>
                <Link to='/' className='flex items-center gap-3 text-lg text-white font-semibold'>
                    <img src={Logo} className='w-[40px]' alt='logo' /> CarbonLite
                </Link>
            </div>
            <ul className='hidden md:flex items-center gap-10 text-lg font-semibold text-white'>
                <li>
                    <Link className='hover:opacity-50' to="/calculate">Calculate</Link>
                </li>
                <li>
                    <Link className='hover:opacity-50' to="/about">About</Link>
                </li>
                <li>
                    <Link className='hover:opacity-50' to="/contact">Contact</Link>
                </li>
            </ul>
            <div className='flex items-center gap-5'>

                <Button type='' text='Log In' />
                <Button type='secondary' text='Sign Up' />
            </div>

        </nav>
    )
}

export default Header