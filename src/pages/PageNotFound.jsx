import { Link } from 'react-router-dom'
import Button from '../components/Button/Button';

const PageNotFound = () => {
    return (
        <section className="flex items-center justify-center w-screen h-screen p-16 bg-[#374151] z-50">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-8 max-w-md text-center items-center">
                    <h2 className="font-extrabold text-9xl text-[#4B5563]">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl md:text-3xl text-[#9CA3AF]">Sorry, we couldn't find this page.</p>
                    <Link to="/" className=""><Button type='secondary' text='Back to home' /></Link>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound;