import readlinesync = require('readline-sync');
import { colors } from './src/util/Color';
import { ProdutoController } from './src/controller/ProdutoController';
import { Cosmetico } from './src/model/Cosmetico';
import { Medicamento } from './src/model/Medicamento';

export function main() {
    let opcao, id, tipo, preco: number;
    let nome, generico, fragancia: string;

    const tipoProdutos: Array<string> = ['Generico', 'Cosmetico'];

    const produtos: ProdutoController = new ProdutoController();

    while (true) {
        console.log(
            colors.bg.black,
            colors.fg.yellow,
            '*****************************************************'
        );
        console.log('                                                     ');
        console.log('                Farmácia                             ');
        console.log('                                                     ');
        console.log('*****************************************************');
        console.log('                                                     ');
        console.log('            1 - Criar Produto                        ');
        console.log('            2 - Listar todos os Produtos             ');
        console.log('            3 - Buscar Produto por ID                ');
        console.log('            4 - Atualizar Produto                    ');
        console.log('            5 - Apagar Produto                       ');
        console.log('            0 - Sair                                 ');
        console.log('                                                     ');
        console.log('*****************************************************');
        console.log(colors.reset);

        console.log('Entre com a opção desejada: ');
        opcao = readlinesync.questionInt();

        if (opcao === 0) {
            console.log('\nFarmácia Maluca - Rémedios para Doidos');
            about();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log('\n\nCriar Produto\n\n');

                console.log('Digite o nome do produto: ');
                nome = readlinesync.question();

                console.log('Escolha o tipo de produto: ');
                tipo =
                    readlinesync.keyInSelect(tipoProdutos, '', {
                        cancel: false,
                    }) + 1;

                console.log('Digite o preço do produto: ');
                preco = readlinesync.questionFloat();

                switch (tipo) {
                    case 1:
                        console.log('Digite o nome do genérico: ');
                        generico = readlinesync.question();

                        produtos.criarProduto(
                            new Medicamento(
                                produtos.gerarNumero(),
                                nome,
                                tipo,
                                preco,
                                generico
                            )
                        );
                        break;
                    case 2:
                        console.log('Digite o nome da fragância: ');
                        fragancia = readlinesync.question();

                        produtos.criarProduto(
                            new Cosmetico(
                                produtos.gerarNumero(),
                                nome,
                                tipo,
                                preco,
                                fragancia
                            )
                        );
                        break;
                }

                keyPress();
                break;
            case 2:
                console.log('\n\nListar todos os produtos\n\n');
                produtos.listarTodosOsProdutos();

                keyPress();
                break;
            case 3:
                console.log('\n\nBuscar produto por ID: \n\n');
                console.log('Digite o ID do produto: ');
                id = readlinesync.questionInt();

                produtos.consultarProdutoPorId(id);

                keyPress();
                break;
            case 4:
                console.log('\n\nAtualizar Produto\n\n');

                console.log('Digite o ID do produto: ');
                id = readlinesync.questionInt();

                let produto = produtos.buscarNoArray(id);

                if (produto !== null) {
                    console.log('Digite o nome do produto: ');
                    nome = readlinesync.question();

                    console.log('Digite o preço do produto: ');
                    preco = readlinesync.questionFloat();

                    switch (produto.tipo) {
                        case 1:
                            console.log('Digite o nome do genérico: ');
                            generico = readlinesync.question();

                            produtos.criarProduto(
                                new Medicamento(
                                    id,
                                    nome,
                                    produto.tipo,
                                    preco,
                                    generico
                                )
                            );
                            break;
                        case 2:
                            console.log('Digite o nome da fragância: ');
                            fragancia = readlinesync.question();

                            produtos.criarProduto(
                                new Cosmetico(
                                    id,
                                    nome,
                                    produto.tipo,
                                    preco,
                                    fragancia
                                )
                            );
                            break;
                    }
                } else console.log('Produto não encontrado!');

                keyPress();
                break;
            case 5:
                console.log('\n\nApagar Produto\n\n');

                console.log('Digite o ID do produto:');
                id = readlinesync.questionInt();

                produtos.deletarProduto(id);

                keyPress();
                break;
            default:
                console.log('\nOpção Inválida\n');
                keyPress();
                break;
        }
    }
}

export function about() {
    console.log(colors.bg.black, colors.fg.green);
    console.log('*'.repeat(50));
    console.log('Projeto Desenvolvido por: ');
    console.log('Cauã R. Pereira - 7aauac@gmail.com');
    console.log('https://github.com/c-rocha7');
    console.log('*'.repeat(50));
    console.log(colors.reset);
}

function keyPress(): void {
    console.log('\nPressione enter para continuar...');
    readlinesync.prompt();
}

main();
