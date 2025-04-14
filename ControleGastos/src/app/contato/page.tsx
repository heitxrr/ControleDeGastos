import Rodape from "@/components/Rodape/Rodape"
import MenuHamburguer from "@/components/MenuHamburguer/MenuHamburguer"


export default function Contato() {
    return (
      <main className="bg-gray-800  p-4 rounded-lg mt-6 shadow-md max-w-3xl mx-auto px-4 text-white">
        <MenuHamburguer />
        <h1 className="text-3xl font-bold mb-4">Contato</h1>
        <p className="mb-2 text-gray-300">
          Se você quiser entrar em contato comigo para conversar sobre tecnologia, projetos ou colaborações, fique à vontade!
        </p>
  
        <ul className=" text-gray-300 p-4 rounded-lg mt-6">
          <li>Email: <a href="mailto:seuemail@email.com" className="text-blue-500 hover:underline">heitorrrocha04@outlook.com</a></li>
          <li>GitHub: <a href="https://github.com/heitxrr" className="text-blue-500 hover:underline" target="_blank">github.com/heitxrr</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/seuusuario" className="text-blue-500 hover:underline" target="_blank">linkedin.com/in/heitorrrocha/</a></li>
        </ul>
        <Rodape />
      </main>
    )
  }
  