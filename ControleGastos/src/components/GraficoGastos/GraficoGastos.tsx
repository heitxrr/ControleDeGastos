'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Gasto from '@/types/Gasto';

const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

interface Props {
  gastos: Gasto[];
}

export default function GraficoGastos({ gastos }: Props) {
  const dados = Object.values(
    gastos.reduce((acc, gasto) => {
      if (!acc[gasto.categoria]) acc[gasto.categoria] = { name: gasto.categoria, value: 0 };
      acc[gasto.categoria].value += gasto.valor;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Gastos por Categoria</h2>
      <ResponsiveContainer width="101%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={dados} cx="50%" cy="50%" outerRadius={90} label>
            {dados.map((_, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
