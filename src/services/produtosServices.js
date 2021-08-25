import { ProdutosDbModules } from "../modules/produtosDbModules.js";

class ProdutosService {
  async createProduto(produtoData) {
    try {
      const { nome, descricao, validade } = produtoData;
      const produtoDbModules = new ProdutosDbModules();
      const createdProduto = await produtoDbModules.createProduto(
        nome,
        descricao,
        validade
      );
      return createdProduto;
    } catch (err) {
      console.log(err.message);
      throw new Error("something went wrong in createProdutoService");
    }
  }

  async getProdutos() {
    try {
      const produtoDbModules = new ProdutosDbModules();
      const produtos = await produtoDbModules.getProdutos();
      return produtos;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getProdutosService");
    }
  }

  async getProdutoById(id) {
    try {
      const produtoDbModules = new ProdutosDbModules();
      const produto = await produtoDbModules.getProdutoById(id);
      return produto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getProdutoByIdService");
    }
  }

  async updateProduto(id, info) {
    try {
      const produtoDbModules = new ProdutosDbModules();
      const updatedProduto = await produtoDbModules.updateProduto(
        id,
        info.nome,
        info.descricao,
        info.validade
      );
      return updatedProduto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in updateProdutoService");
    }
  }
}

export { ProdutosService };
