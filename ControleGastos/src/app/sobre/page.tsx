import Rodape from "@/components/Rodape/Rodape";
import MenuHamburguer from "@/components/MenuHamburguer/MenuHamburguer";


export default function Sobre() {
    return (
      <main className="bg-gray-800  p-4 rounded-lg mt-6 shadow-md max-w-3xl mx-auto px-4 text-white">
        <MenuHamburguer />
        <h1 className="text-3xl font-bold mb-4">Sobre Mim</h1>
        <p className="mb-4 text-gray-300">
          Olá! Eu sou Heitor, estudante de Análise e Desenvolvimento de Sistemas.
          Sou apaixonado por tecnologia e atualmente estou desenvolvendo este site como parte de um projeto pessoal
          para controlar minhas metas financeiras e gastos pessoais.
        </p>
        <p className="text-gray-300">
          Gosto de trabalhar com tecnologias como React, TypeScript, Node.js e estou aprendendo a integrar sistemas com banco de dados Oracle.
        </p>
        <Rodape />
      </main>
    )
  }
  