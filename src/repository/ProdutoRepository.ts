import { Produto } from "../model/Produto";

export interface ProdutoRepository {
	criarProduto(produto: Produto): void;
	listarTodosOsProdutos(): void;
	consultarProdutoPorId(id: number): void;
	atualizarProduto(produto: Produto): void;
	deletarProduto(id: number): void;
}
