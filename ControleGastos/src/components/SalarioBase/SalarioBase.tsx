'use client';

import { useState, useEffect } from 'react';

interface Props {
  onSetSalario: (valor: number) => void;
  salarioAtual: number;
}

export default function SalarioBase({ onSetSalario, salarioAtual }: Props) {
  const [inputSalario, setInputSalario] = useState(salarioAtual.toString());

  useEffect(() => {
    setInputSalario(salarioAtual.toString());
  }, [salarioAtual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(inputSalario);
    if (!isNaN(valor)) {
      onSetSalario(valor);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-2">Salário Base</h2>
      <div className="flex items-center gap-4">
        <input
          type="number"
          placeholder="Digite seu salário"
          value={inputSalario}
          onChange={(e) => setInputSalario(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">Salário atual: R$ {salarioAtual.toFixed(2)}</p>
    </form>
  );
}
