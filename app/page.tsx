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
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function buscar() {
    const valorLimpo = cnpj.replace(/\D/g, "");

    if (valorLimpo.length !== 14) {
      setEmpresa(null);
      setErro("Digite um CNPJ válido.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${valorLimpo}`);

      if (!res.ok) {
        throw new Error("CNPJ inválido ou não encontrado.");
      }

      const dados: Empresa = await res.json();
      setEmpresa(dados);
    } catch (error) {
      setEmpresa(null);
      setErro(error instanceof Error ? error.message : "Não foi possível buscar o CNPJ.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Buscador de CNPJ</h1>
      <div className="flex gap-2 mb-2">
        <input
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
          maxLength={18}
          className="border p-4 rounded flex-1"
        />
        <button
          type="button"
          onClick={buscar}
          disabled={carregando}
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && <p className="mb-2 text-sm text-red-600">{erro}</p>}

      {empresa && (
        <div className="border p-3 rounded space-y-2">
          <p><strong>Razão Social:</strong> {empresa.razao_social}</p>
          <p><strong>Nome Fantasia:</strong> {empresa.nome_fantasia}</p>
          <p><strong>Situação:</strong> {empresa.descricao_situacao_cadastral}</p>
        </div>
      )}
    </main>
  );
}
