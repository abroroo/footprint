import React from 'react'
import footerImg from '../../assets/footer.png'
import Logo from '../../assets/logo.svg'
import FooterIcon from '../../assets/plant.png'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div style={{
            backgroundImage: `url(${footerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: 'bottom center',
            width: '100%',
            height: '100%',
        }} >
            <div className='container mx-auto px-5 pt-16 flex justify-between'>
                <div className='flex flex-col justify-between gap-10'>
                    <Link to='/' className='flex items-center gap-3 text-lg text-white font-semibold'>
                        <img src={Logo} className='w-[40px]' alt='logo' /> CarbonLite
                    </Link>
                    <span className='text-white pb-4'>&copy; 2023 All rights reserved</span>
                </div>
                <div>
                    <img src={FooterIcon} className='w-[150px]' alt='Plant' />
                </div>
            </div>
        </div>
    )
}

export default Footer
