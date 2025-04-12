'use client';

import { useState } from 'react';
import Gasto from '@/types/Gasto';

interface ListaGastosProps {
  gastos: Gasto[];
}

function formatarData(dataStr: string): string {
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.toLocaleDateString('pt-BR');
}

function obterAnoMes(dataStr: string) {
  const [ano, mes] = dataStr.split('-').map(Number);
  return {
    ano,
    mes,
  };
}

export default function ListaGastos({ gastos }: ListaGastosProps) {
  const [filtroMesSelecionado, setFiltroMesSelecionado] = useState<number | null>(null);
  const [filtroAnoSelecionado, setFiltroAnoSelecionado] = useState<number | null>(null);

  const [filtroAplicado, setFiltroAplicado] = useState<{ mes: number | null; ano: number | null }>({
    mes: null,
    ano: null,
  });

  const aplicarFiltro = () => {
    setFiltroAplicado({ mes: filtroMesSelecionado, ano: filtroAnoSelecionado });
  };

  const anos = Array.from(new Set(gastos.map((g) => obterAnoMes(g.data).ano)));
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);

  const gastosFiltrados = gastos.filter((gasto) => {
    const { ano, mes } = obterAnoMes(gasto.data);
    const anoValido = filtroAplicado.ano ? ano === filtroAplicado.ano : true;
    const mesValido = filtroAplicado.mes ? mes === filtroAplicado.mes : true;
    return anoValido && mesValido;
  });

  const gastosAgrupados: Record<string, Gasto[]> = {};

  gastosFiltrados.forEach((gasto) => {
    const dataFormatada = formatarData(gasto.data);
    if (!gastosAgrupados[dataFormatada]) {
      gastosAgrupados[dataFormatada] = [];
    }
    gastosAgrupados[dataFormatada].push(gasto);
  });

  const datas = Object.keys(gastosAgrupados).sort((a, b) => {
    const [diaA, mesA, anoA] = a.split('/').map(Number);
    const [diaB, mesB, anoB] = b.split('/').map(Number);
    const dataA = new Date(anoA, mesA - 1, diaA);
    const dataB = new Date(anoB, mesB - 1, diaB);
    return dataB.getTime() - dataA.getTime();
  });

  return (
    <div className="bg-gray-800 text-gray-100 p-4 mt-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Lista de Gastos</h2>

      <div className="flex gap-4 items-end mb-4">
        <select
          onChange={(e) => setFiltroMesSelecionado(e.target.value ? parseInt(e.target.value) : null)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
          value={filtroMesSelecionado || ''}
        >
          <option value="">Todos os meses</option>
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes.toString().padStart(2, '0')}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setFiltroAnoSelecionado(e.target.value ? parseInt(e.target.value) : null)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
          value={filtroAnoSelecionado || ''}
        >
          <option value="">Todos os anos</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>

        <button
          onClick={aplicarFiltro}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-1 rounded transition duration-200"
        >
          Filtrar
        </button>
      </div>

      {datas.length === 0 && <p className="text-gray-400">Nenhum gasto encontrado para o filtro selecionado.</p>}

      {datas.map((data) => (
        <div key={data} className="mb-4">
          <h3 className="font-bold text-green-400">{data}</h3>
          <ul className="pl-4 mt-1 space-y-1">
            {gastosAgrupados[data].map((gasto, index) => (
              <li key={index} className="border-b border-gray-700 pb-1 text-sm">
                {gasto.descricao} - R$ {gasto.valor.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
