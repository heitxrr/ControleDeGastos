'use client';

import { useState } from 'react';
import MenuHamburguer from '@/components/MenuHamburguer/MenuHamburguer';
import Cabecalho from '@/components/Cabecalho/Cabecalho';
import FormularioGasto from '@/components/FormularioGasto/FormularioGasto';
import ListaGastos from '@/components/ListaGastos/ListaGastos';
import PainelProgresso from '@/components/PainelProgresso/PainelProgresso';
import SalarioBase from '@/components/SalarioBase/SalarioBase';
import Gasto from '@/types/Gasto';
import GraficoGastos from '@/components/GraficoGastos/GraficoGastos';
import GraficoSalario from '@/components/GraficoSalario/GraficoSalario';
import BackupDados from '@/components/BackupDados/BackupDados';
import Rodape from '@/components/Rodape/Rodape';

const META = 40000;

export default function PaginaInicial() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [salario, setSalario] = useState<number>(0);

  const adicionarGasto = (gasto: Gasto) => {
    setGastos((prev) => [...prev, gasto]);
  };

  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);

  return (
    <main className="max-w-5xl mx-auto mt-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className=" p-4 rounded-xl shadow-md h-full flex items-center justify-center">
          <GraficoGastos gastos={gastos} />
        </div>
        <div className=" p-4 rounded-xl shadow-md h-full flex items-center justify-center">
          <GraficoSalario salario={salario} totalGastos={totalGastos} />
        </div>
      </div>
      <MenuHamburguer />
      <Cabecalho />
      <SalarioBase onSetSalario={setSalario} salarioAtual={salario} />
      <PainelProgresso gastos={gastos} salario={salario} meta={META} />
      <FormularioGasto aoAdicionar={adicionarGasto} />
      <ListaGastos gastos={gastos} />
      <BackupDados onDadosImportados={() => console.log('Dados importados com sucesso!')} />
      <Rodape />
    </main>
  );
}
