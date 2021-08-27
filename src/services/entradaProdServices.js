import { entradaProdDbModules } from "../modules/entradaProdModules.js";

class entradaProdService {
  async createEntradaProd(entradaProdData) {
    try {
      const { nome, lote, dataValidade} = entradaProdData;
      const EntradaProd = new entradaProdDbModules();
      const createdentradaProd = await EntradaProd.createEntradaProd(
        nome,
        lote,
        dataValidade,
      );
      return createdentradaProd;
    } catch (err) {
      console.log(err.message);
      throw new Error("something went wrong in createEntradaProdService");
    }
  }

  async getentradaProdutos() {
    try {
      const entradaprodutoDbModules = new entradaProdDbModules();
      const entradaprodutos = await entradaprodutoDbModules.getEntradaProdutos();
      return entradaprodutos;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getentradaProdutosService");
    }
  }

  async getEntradaProdutoById(id) {
    try {
      const entradaProdutoDbModules = new entradaProdDbModules();
      const entradaProduto = await entradaProdutoDbModules.getEntradaProdutoById(id);
      return entradaProduto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getEntradaProdutoByIdService");
    }
  }

  async updateEntradaProduto(id, info) {
    try {
      const entradaProdutoDbModules = new entradaProdDbModules();
      const updatedEntradaProduto = await entradaProdutoDbModules.updateEntradaProduto(
        id,
        info.nome,
        info.lote,
        info.dataValidade
      );
      return updatedEntradaProduto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in updateEntradaProdutoService");
    }
  }
}

export { entradaProdService };
