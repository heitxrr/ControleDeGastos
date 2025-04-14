import React from 'react';
import Image from 'next/image';
import Logo from '../../../public/LogoHR.png';

const Rodape: React.FC = () => {
    return (
        <footer className=" py-4 flex justify-center items-center">
            <Image 
                src={Logo}
                alt="Logo" 
                className="h-12 w-auto" 
            />
        </footer>
    );
};

export default Rodape;
