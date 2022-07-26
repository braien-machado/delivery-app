const validUser = {
	email: 'zebirita@email.com',
	password: '$#zebirita#$',
};

const validAdmin = {
	email: 'adm@deliveryapp.com',
	password: '--adm2@21!!--',
};

const validSeller = {
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
};

const inValidUser = {
  email: 'zebirita@email.com',
	password: '$#zebirita#$$',
};

const adminDbResponse = {
  id: 3,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
};

const userDbResponse = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const userWithoutEmail = {
  password: '123456789',
};

const userWithoutPassword = {
  email: 'mock@mock.com',
};

const sellerDbResponse = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller',
};

module.exports = {
  validUser,
  validAdmin,
  adminDbResponse,
  validSeller,
  userDbResponse,
  inValidUser,
  userWithoutEmail,
  userWithoutPassword,
  sellerDbResponse,
};
