'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuHamburguer() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <div className="fixed top-2 left-4 z-50">
        <button onClick={() => setAberto(!aberto)} className="text-white bg-gray-800 p-2 rounded shadow-md hover:bg-gray-700 transition duration-300">
          {aberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg p-6 z-40"
          >
            <button onClick={() => setAberto(false)} className="mb-4">
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setAberto(false)}>Página Principal</Link>
              <Link href="/sobre" onClick={() => setAberto(false)}>Sobre Mim</Link>
              <Link href="/contato" onClick={() => setAberto(false)}>Contato</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
