const createdSale = {
	id: 1,
	products: [
		{
			id: 8,
			quantity: 9
		}
	]
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTgxMDgxNjQsImV4cCI6MTY2Njg5MjE2NH0.IbkP-vBREVSxpo8DKJuw1mgkVKZlVT3GSJPU4u13U0Q';

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
  token,
  validSale,
  saleWithoutTotalPrice,
  saleWithoutProducts,
  saleWithouProductsProperties,
};
