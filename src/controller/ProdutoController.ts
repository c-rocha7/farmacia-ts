import { Produto } from '../model/Produto';
import { ProdutoRepository } from '../repository/ProdutoRepository';

export class ProdutoController implements ProdutoRepository {
    private listaProdutos: Array<Produto> = new Array<Produto>();
	public numero: number = 0;

    criarProduto(produto: Produto): void {
        this.listaProdutos.push(produto);
        console.log(
            `\nO produto de id: ${produto.id} com nome: ${produto.nome} foi adicionado com sucesso!`
        );
    }

    listarTodosOsProdutos(): void {
        for (let produto of this.listaProdutos) {
            produto.visualizar();
        }
    }

    consultarProdutoPorId(id: number): void {
        for (let produto of this.listaProdutos) {
            if (produto.id === id) return produto.visualizar();
        }
    }

    atualizarProduto(produto: Produto): void {
        const buscaProduto = this.buscarNoArray(produto.id);

        if (buscaProduto !== null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] =
                produto;
            console.log(
                `O produto de id ${produto.id} foi atualizar com sucesso!`
            );
        } else console.log('\nProduto não encontrado!');
    }

    deletarProduto(id: number): void {
        const buscaProduto = this.buscarNoArray(id);

        if (buscaProduto !== null) {
            this.listaProdutos.splice(
                this.listaProdutos.indexOf(buscaProduto),
                1
            );
            console.log(`O produto foi deletado com sucesso!`);
        } else console.log('\nProduto não encontrado!');
    }

    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscarNoArray(id: number): Produto | null {
        for (let produto of this.listaProdutos) {
            if (produto.id === id) return produto;
        }

        return null;
    }
}
