'use client';

import { useState } from 'react';
import Gasto from '@/types/Gasto';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  aoAdicionar: (gasto: Gasto) => void;
}

export default function FormularioGasto({ aoAdicionar }: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  const aoSubmeter = (e: React.FormEvent) => {
    e.preventDefault();

    const novoGasto: Gasto = {
      id: uuidv4(),
      descricao,
      valor,
      categoria,
      data,
    };

    aoAdicionar(novoGasto);

    // Limpar campos
    setDescricao('');
    setValor(0);
    setCategoria('');
    setData('');
  };

  return (
    <form onSubmit={aoSubmeter} className="space-y-4 p-4 bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar Gasto
      </button>
    </form>
  );
}
