import { dbConnect } from "../../data/db.js";

class ProdutosDbModules {
  async createProduto(nome, descricao, validade) {
    try {
      const produto = await dbConnect("produtos")
        .insert({
          nome,
          descricao,
          validade,
        })
        .returning([
          "id",
          "nome",
          "descricao",
          "validade",
          "created_at",
          "updated_at",
        ]);
      return produto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in createProdutoModules");
    }
  }

  async getProdutoById(id) {
    try {
      const produto = dbConnect("produtos").where("id", id).first();
      return produto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getProdutoById");
    }
  }

  async updateProduto(id, nome, descricao, validade) {
    try {
      const date = new Date();
      const updatedProduto = await dbConnect("produtos").where("id", id).update(
        {
          nome: nome,
          descricao: descricao,
          validade: validade,
          updated_at: date,
        },
        ["id", "nome", "descricao", "validade", "created_at", "updated_at"]
      );
      return updatedProduto;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in updateProduto");
    }
  }

  async getProdutos() {
    try {
      const produtos = await dbConnect("produtos").select().table("produtos");
      return produtos;
    } catch (err) {
      console.log(err.message);
      throw new Error("Something went wrong in getProdutos");
    }
  }
}

export { ProdutosDbModules };
