'use client';

//  import { useRef } from 'react';

interface BackupDadosProps {
  onDadosImportados: () => void;
}

const API_URL = "http://localhost:3001";

export default function BackupDados({ onDadosImportados }: BackupDadosProps) {
  //const inputRef = useRef<HTMLInputElement | null>(null);

  const exportarDados = async () => {
    try {
      const response = await fetch(`${API_URL}/gastos`);
      const gastos = await response.json();

      const salarioResponse = await fetch(`${API_URL}/salario`);
      const salarioData = await salarioResponse.json();

      const dados = {
        salario: salarioData.salario,
        gastos,
      };

      const blob = new Blob([JSON.stringify(dados, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'dados-controle-gastos.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erro ao exportar os dados. Verifique a conexão com o servidor.');
      console.error(error);
    }
  };

  const importarDadosDiretoDoBanco = async () => {
    try {
      const responseGastos = await fetch(`${API_URL}/gastos`);
      const gastos = await responseGastos.json();

      const responseSalario = await fetch(`${API_URL}/salario`);
      const salario = await responseSalario.json();

      console.log('Gastos importados:', gastos);
      console.log('Salário importado:', salario);

      alert('Dados importados com sucesso!');
      onDadosImportados();
    } catch (error) {
      alert('Erro ao importar dados do banco.');
      console.error(error);
    }
  };

  const limparDados = async () => {
    if (confirm('Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.')) {
      try {
        await fetch(`${API_URL}/gastos`, { method: 'DELETE' });
        await fetch(`${API_URL}/salario`, { method: 'DELETE' });
        alert('Dados apagados com sucesso.');
        onDadosImportados();
      } catch (err) {
        alert('Erro ao apagar os dados. Verifique a conexão.');
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mt-6 shadow-md">
      <h2 className="text-lg font-semibold mb-2">Backup de Dados</h2>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={exportarDados}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Exportar Dados
        </button>

        <button
          onClick={importarDadosDiretoDoBanco}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
        >
          Importar Dados do Banco
        </button>

        <button
          onClick={limparDados}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Limpar Dados
        </button>
      </div>
    </div>
  );
}
