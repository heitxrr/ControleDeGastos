'use client';

import { useEffect, useState } from 'react';
import Gasto from '@/types/Gasto';

interface PainelProgressoProps {
  gastos: Gasto[];
  salario: number;
  meta: number;
}

function agruparGastosPorMes(gastos: Gasto[]) {
  return gastos.reduce((acc: Record<string, number>, gasto) => {
    const data = new Date(gasto.data);
    const mesAno = `${data.getFullYear()}-${data.getMonth() + 1}`;
    acc[mesAno] = (acc[mesAno] || 0) + gasto.valor;
    return acc;
  }, {});
}

export default function PainelProgresso({ gastos, salario, meta }: PainelProgressoProps) {
  const [progresso, setProgresso] = useState(0);
  const [lucroTotal, setLucroTotal] = useState(0);

  useEffect(() => {
    const gastosPorMes = agruparGastosPorMes(gastos);
    let lucroAcumulado = 0;

    Object.values(gastosPorMes).forEach((totalGastosMes) => {
      const lucroMes = salario - totalGastosMes;
      if (lucroMes > 0) {
        lucroAcumulado += lucroMes;
      }
    });

    setLucroTotal(lucroAcumulado);
    setProgresso(Math.min((lucroAcumulado / meta) * 100, 100));
  }, [gastos, salario, meta]);

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Progresso da Meta</h2>
      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-2">
        <div
          className="bg-green-500 h-4 transition-all duration-300"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>
      <p>{`Lucro acumulado: R$ ${lucroTotal.toFixed(2)} de R$ ${meta.toFixed(2)}`}</p>
    </div>
  );
}
