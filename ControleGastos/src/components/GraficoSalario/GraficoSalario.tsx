'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  salario: number;
  totalGastos: number;
}
//grafico salariovsgastos
export default function GraficoSalario({ salario, totalGastos }: Props) {
  const dados = [
    { nome: 'Salário', valor: salario },
    { nome: 'Gastos', valor: totalGastos },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Salário vs Gastos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
