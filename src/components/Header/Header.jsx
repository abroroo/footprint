import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import Button from '../Button/Button'
const Header = () => {
    return (
        <nav className='flex items-center justify-between px-5'>
            <div>
                <Link to='/' className='flex items-center gap-3 text-xl tracking-wide text-white font-semibold'>
                    <img src={Logo} className='w-[40px]' alt='logo' /> CarbonLite
                </Link>
            </div>
            {/* <ul className='hidden md:flex items-center gap-10 text-lg font-semibold text-white'>
                <li>
                    <Link className='hover:opacity-50' to="/calculate">Calculate</Link>
                </li>
                <li>
                    <Link className='hover:opacity-50' to="/about">About</Link>
                </li>
                <li>
                    <Link className='hover:opacity-50' to="/contact">Contact</Link>
                </li>
            </ul> */}
            <div className='flex items-center gap-5'>
                <Link to='/signin'>
                    <Button type='' text='Sign In' />
                </Link>
                <Link to='/signup'>
                    <Button type='secondary' text='Sign Up' />
                </Link>

            </div>

        </nav>
    )
}

export default Header