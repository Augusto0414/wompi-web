export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  available: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}


export interface Customer {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: string;
}

export interface CreateCustomerDto {
  email: string;
  fullName: string;
  phone: string;
}


export interface Delivery {
  id: string;
  transactionId: string;
  customerId: string;
  address: string;
  city: string;
  department: string;
  zipCode: string;
  instructions?: string;
  status: string;
  createdAt: string;
}

export interface CreateDeliveryDto {
  transactionId: string;
  customerId: string;
  address: string;
  city: string;
  department: string;
  zipCode: string;
  instructions?: string;
}


export type TransactionStatus = "PENDING" | "APPROVED" | "DECLINED" | "ERROR";

export interface Transaction {
  id: string;
  productId: string;
  customerId?: string;
  productPrice: number;
  baseCharge: number;
  shippingCost: number;
  totalAmount: number;
  status: TransactionStatus;
  wompiTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  productId: string;
  customerId?: string;
  shippingCost?: number;
}


export interface PayTransactionDto {
  cardToken: string;
}

export interface TokenizeCardDto {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardHolder: string;
}

export interface AcceptanceTokenResponse {
  success: boolean;
  data: {
    acceptanceToken: string;
    permalink: string;
    type: string;
  };
}

export interface TokenizeCardResponse {
  success: boolean;
  data: {
    tokenId: string;
    brand: string;
    lastFour: string;
    expiresAt: string;
  };
}


export interface CheckoutFormData {

  email: string;

  fullName: string;
  phone: string;

  address: string;
  city: string;
  department: string;
  zipCode: string;
  instructions?: string;

  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvc: string;
}
