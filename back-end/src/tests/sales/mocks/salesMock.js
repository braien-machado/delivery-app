const createdSale = {
	id: 1,
	products: [
		{
			id: 8,
			quantity: 9
		}
	]
};

const validSale = {
	"totalPrice": 89.07,
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "id": 8, "quantity": 9 }],
	"sellerId": 2
};

const saleWithoutTotalPrice = {
  "deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "id": 8, "quantity": 9 }],
	"sellerId": 2
};

const saleWithoutProducts = {
  "totalPrice": 89.07,
	"deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"sellerId": 2
};

const saleWithouProductsProperties = {
  "totalPrice": 89.07,
  "deliveryAddress": "Rua dos testes",
	"deliveryNumber": "1305",
	"products": [{ "quantity": 9 }],
	"sellerId": 2
}

module.exports = {
  createdSale,
  validSale,
  saleWithoutTotalPrice,
  saleWithoutProducts,
  saleWithouProductsProperties,
};
