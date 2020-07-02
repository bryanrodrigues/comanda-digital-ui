
export class User{
  idUser:         number;
  cpf:            string;
  dtRegistarion:  Date;
  name:          string;
  password:      string;
  email:         string;
  userPermissions: UserPermissions[];
}

export class Store{
  idStore:          number;
  cnpj:             string;
  name:             string;
  phone:            string;
  status:           number;
  registrationDate: Date;
  user = new User();
  address = new Address();
}

export class Product{
  idProduct:    number;
  description:  string;
  name:         string;
  value:        number;
  store = new Store();
  type = new ProductType();
}

export class Card{
  idCard:         number;
  amountPeople:   number;
  beginDate:      Date;
  endDate:        Date;
  tableNumber:    number;
  value:          number;
  store =         new Store();
  user  =         new User();
}

export class ProductCard{
  idProductCard:    number;
  amountProduct:    number;
  dateRegistration: Date;
  dateChange:       Date;
  value:            number;
  note:             string;
  card = new Card();
  product = new Product();
}

export class UserPermissions{
  idPermission: number;
  description: number;
}
export class Address{
  idAddres: string;
  cep:          string;
  logradouro:       string;
  complemento:    string;
  bairro:     string;
  localidade:             string;
  uf:            string;
}

export class UserChangePassword{
  idUser:           number;
  password:         string;
  newPassword:      string;

}

export class ProductType{
  idProductType:  number;
  description:    string;
}
