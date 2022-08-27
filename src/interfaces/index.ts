export interface IUser {
  id: number;
  address: any;
  age: number;
  birthDate: string;
  bloodGroup: string;
  company: Company;
  email: string;
  firstName: string;
  lastName: string;
  blood?: string;
  phone: string;
  university: string;
  gender: string;
  image: string;
}
interface Address {
  address: string;
  city: string;
}
interface Company {
  department: string;
  city: string;
}

export interface IUserData {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  university: string;
  age: number;
  blood: string;
  birthDate?: string;
  birth: string;
  address: string;
  gender: string;
  image: string;
}

export interface IProductData {
  id?: number;
  title?: string;
  description?: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}
