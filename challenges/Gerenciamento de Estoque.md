Eu vou tentar omitir alguns IDs já que a minha intenção não é evitar a conexão entre o mapeamento e o banco, mas em algumas situações eu posso achar necessário ter eles
### Entidades:
- Produto
	- Número de identificação a cada produto (ID)
	- Nome
	- Categorias -> Algo como um array contendo os IDs das categorias `(talvez deixar a critério do gerente da loja definir esses critérios e utilizar algo como um Value object pra manter mais padronizado? Eu poderia definir isso de forma estática, mas dependendo da tipo de loja que estamos trabalhando os produtos podem ser dos mais variados) dificultando esse tipo de categorização`
- Categorias por produto
	- Identificador da categoria
	- Identificador do produto
	- Nome da categoria
	- Valor da categoria
- Estoque
	- quantidade
	- quantidade mínima
	- Identificação do produto (ID)
- Compras
	- Produto(s)
		- ID
		- Quantidade
		- Valor unitário dentro dessa compra especifica
	- Valor total
	- Id do fornecedor
	- Prazo de entrega estipulado
	- Dia da compra
- Vendas
	- Produtos vendidos
		- ID do produto
		- Quantidade
		- Preço do produto naquela venda 	
	- Valor total da venda
	- Valor recebido
	- Quando a venda foi registrada
- Fornecedor
	- Número de identificação a cada Fornecedor (ID)
	- Nome

### Casos de uso:
- Histório
	- Pegar histório de vendas
		- Filtragem por período de tempo
		- Valor/lucro total das vendas
		- Produtos vendidos
			- Lucro gerado pelo produto (unitário)
			- Ordenar por quais produtos tiveram mais vendas naquele periodo
	- Pegar histórico de estoque
		- Quanto produtos tiveram restock no período
		- Produtos que tiveram restock no período
			- ID do produto/Nome
			- Quantidade comprada pra restock
			- Quantidade vendida do produto no periodo (pra fazer comparação entre Comprado x Vendido)
			- Valor gasto na compra
			- Quantos alertas tiveram pra esse produto
- Alertar com quando um produto estiver próximo da quantidade mímina em estoque
	- Por e-mail e notificações no sistema
	- A uso do caso de uso pode ocorrer após a venda de um produto?  *(Eu sinto que isso daqui é um Domain event, mas eu posso estar enganado)*
- Produto
	- Pegar produto
	- Criar produto
- Categoria/informações extras
	- Criar categoria  por produto
	- Filtrar por categoria "para tornar o rastreamento mais preciso"
- Estoque
	- Criar estoque por produto -> define valores minimos
	- Alterar estoque por produto -> altera quantidade atual presente no estoque e talvez valores minimos
-  Vendas
	- Criar uma venda
	- Atualizar valor recebido da venda
- Compras
	- Criar ordem de compra
	- Atualizar prazo de entrega