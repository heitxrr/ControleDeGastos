'use client';

import { useState } from 'react';
import FormularioGasto from '@/components/FormularioGasto/FormularioGasto';
import ListaGastos from '@/components/ListaGastos/ListaGastos';
import PainelProgresso from '@/components/PainelProgresso/PainelProgresso';
import SalarioBase from '@/components/SalarioBase/SalarioBase';
import Gasto from '@/types/Gasto';
import GraficoGastos from '@/components/GraficoGastos/GraficoGastos';
import GraficoSalario from '@/components/GraficoSalario/GraficoSalario';
import BackupDados from '@/components/BackupDados/BackupDados';


const META = 40000;

export default function PaginaInicial() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [salario, setSalario] = useState<number>(0);

  const adicionarGasto = (gasto: Gasto) => {
    setGastos((prev) => [...prev, gasto]);
  };

  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);

  return (
    <main className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Controle de Gastos</h1>

      <SalarioBase onSetSalario={setSalario} salarioAtual={salario} />
      <PainelProgresso gastos={gastos} salario={salario} meta={META} />
      <FormularioGasto aoAdicionar={adicionarGasto} />
      <ListaGastos gastos={gastos} />
      <GraficoGastos gastos={gastos} />
      <GraficoSalario salario={salario} totalGastos={totalGastos} />
      <BackupDados onDadosImportados={() => console.log('Dados importados com sucesso!')} />
    </main>
  );
}
