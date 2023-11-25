import React from 'react'
import heroImg from '../../assets/forest.jpeg'
import Button from '../Button/Button'
import herobg from '../../assets/Deco.svg'
const Hero = () => {
    return (
        <section className='min-h-screen' style={{
            backgroundImage: `url(${herobg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: 'bottom center',
            width: '100%',
            height: '100%',
        }}>
            <div className='flex flex-col md:flex-row items-center justify-between pt-[50px] md:pt-[100px] container mx-auto px-2 md:px-5 gap-2'>
                <div className='flex flex-col w-1/2 gap-4 ml-0 md:ml-[100px]'>
                    <h1 className='text-5xl md:text-7xl tracking-wide md:max-w-[650px] font-bold text-button-green'>Every small action you take can help to save planet!</h1>
                    <p className='text-lg text-white max-w-[500px] mb-10'>Use our interactive calculator to learn your carbon footprint and actions to take to reduce it.</p>
                    <Button type='primary' text='Get Start' />
                </div>
                <div className='w-1/2'>
                    <div className='w-[400px] md:w-[600px] ml-0 md:ml-auto'>
                        <img className='w-full rounded-md' src={heroImg} alt='Hero bg' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero