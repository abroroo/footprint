import React from 'react'
import heroImg from '../../assets/tree.svg'
import Button from '../Button/Button'
import herobg from '../../assets/bg.png'
import Header from '../Header/Header'
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Planet', 'Nature', 'Future'];

const Hero = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000,
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <section className='min-h-screen flex justify-center items-center' style={{
            backgroundImage: `url(${herobg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: 'bottom center',
            width: '100%',
            height: '100%',
        }}>
            <div className='container mx-auto px-2 md:px-5 pt-10 h-[850px] flex flex-col justify-between rounded-xl shadow-inner drop-shadow-md bg-slate-600/30 backdrop-blur-md'>
                <Header />
                <div className='flex flex-col md:flex-row justify-between md:pt-[100px] gap-2'>
                    <div className='flex flex-col w-1/2 gap-6 ml-0 md:ml-[100px]'>
                        <h1 className='text-5xl md:text-7xl max-w-[350px] text-white font-bold'>
                            Save the <span className='text-dark-green'><TextTransition springConfig={presets.stiff}>{TEXTS[index % TEXTS.length]}</TextTransition></span>
                        </h1>
                        <p className='text-lg text-white max-w-[500px] mb-10'>Use our interactive calculator to learn your carbon footprint and actions to take to reduce it.</p>
                        <a href='#mapsection'> <Button type='primary' text='Calculate now!' /></a>
                    </div>
                    <div className='w-1/2'>
                        <div className='w-[400px] md:w-[600px] ml-0 md:ml-auto'>
                            <img className='w-full rounded-md' src={heroImg} alt='Hero bg' />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Hero