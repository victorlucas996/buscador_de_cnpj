"use client";

import { useState } from "react";

interface Empresa {
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
}

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  async function buscar() {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    setEmpresa(await res.json());
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Buscador de CNPJ</h1>
      <div className="flex gap-2 mb-2">
        <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Digite o CNPJ" className="border p-4 rounded flex-1" />
        <button
          onClick={buscar}
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Buscar
        </button>
      </div>
      {empresa && <div className="border p-3 rounded space-y-2">
        <p><strong>Razão Social:</strong> {empresa.razao_social}</p>
        <p><strong>Nome Fantasia:</strong> {empresa.nome_fantasia}</p>
        <p><strong>Situação:</strong> {empresa.descricao_situacao_cadastral}</p>
      </div>}
    </main>
  );
}
