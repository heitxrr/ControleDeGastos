import React from 'react';

const Cabecalho: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white w-full p-4  flex justify-center items-center z-40">
            <h1 className="text-xl font-bold">Controle de Gastos</h1>
        </header>
    );
};

export default Cabecalho;
