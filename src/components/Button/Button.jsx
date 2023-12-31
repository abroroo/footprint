import React from 'react'

const Button = ({ type, text }) => {
    if (type === 'primary') {
        return <button className='bg-gradient-green text-xl tracking-wider rounded-md w-[330px] md:w-[390px] lg:w-[430px] py-3 text-white font-bold cursor-pointer border-1 border-transparent hover:border-dark-green hover:bg-gradient-white hover:text-black transition-colors duration-150'>{text}</button>
    } else if (type === 'gost') {
        return <button className='text-lg bg-white font-semibold rounded-md text-black border-button-green inline-block min-w-[130px] py-1 border-4 box-border hover:opacity-75 '>{text}</button>
    } else if (type === 'secondary') {
        return <button className='text-lg bg-dark-green font-semibold rounded-md text-white border-transparent inline-block min-w-[130px] py-1 border-4 box-border hover:opacity-75 '>{text}</button>
    }
    else {
        return <button className='text-lg font-semibold rounded-md text-white border-transparent inline-block min-w-[130px] py-1 border-4 box-border hover:opacity-75'>{text}</button>
    }
}

export default Button