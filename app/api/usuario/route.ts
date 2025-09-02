import { NextResponse } from "next/server"
import db from "../../_lib/db"

// Função GET - Retorna todos os usuários
export async function GET() {
  try {
    const result = await db.query("SELECT * FROM servico")
    return NextResponse.json(result.rows) // Retorna os dados dos usuários
  } catch (error) {
    console.error("Erro ao acessar o banco:", error)
    return NextResponse.json(
      { erro: "Erro interno ao acessar o banco de dados" },
      { status: 500 },
    )
  }
}

// Função POST - Adiciona um novo usuário
export async function POST(request: Request) {
  try {
    const { nome, email } = await request.json() // Obtém dados do corpo da requisição

    const result = await db.query(
      "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *", // Insere no banco
      [nome, email],
    )

    return NextResponse.json(result.rows[0], { status: 201 }) // Retorna o novo usuário
  } catch (error) {
    console.error("Erro ao gravar no banco:", error)
    return NextResponse.json(
      { erro: "Erro ao gravar no banco de dados" },
      { status: 500 },
    )
  }
}
/*
const addUsuario = async () => {
  const usuario = { nome: 'João', email: 'joao@email.com' };

  const response = await fetch('/api/usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  const data = await response.json();
  console.log(data); // Exibe o novo usuário criado
};
*/

// Função PUT - Atualiza um usuário existente
export async function PUT(request: Request) {
  try {
    const { id, nome, email } = await request.json() // Obtém dados do corpo da requisição

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { erro: "ID do usuário é necessário para atualizar." },
        { status: 400 },
      )
    }

    const result = await db.query(
      "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *",
      [nome, email, id],
    )

    // Se o usuário não foi encontrado
    if (result.rows.length === 0) {
      return NextResponse.json(
        { erro: "Usuário não encontrado." },
        { status: 404 },
      )
    }

    return NextResponse.json(result.rows[0], { status: 200 }) // Retorna o usuário atualizado
  } catch (error) {
    console.error("Erro ao atualizar o banco:", error)
    return NextResponse.json(
      { erro: "Erro ao atualizar o banco de dados" },
      { status: 500 },
    )
  }
}

// Função DELETE - Exclui um usuário
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json() // Obtém o ID do corpo da requisição

    if (!id) {
      return NextResponse.json(
        { erro: "ID do usuário é necessário para excluir." },
        { status: 400 },
      )
    }

    const result = await db.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id],
    )

    // Se o usuário não foi encontrado
    if (result.rows.length === 0) {
      return NextResponse.json(
        { erro: "Usuário não encontrado." },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: "Usuário excluído com sucesso" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao excluir no banco:", error)
    return NextResponse.json(
      { erro: "Erro ao excluir no banco de dados" },
      { status: 500 },
    )
  }
}
