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

// Customer types
export interface Customer {
  id: string;
  email: string;
  fullName: string;
  legalIdType: string;
  legalId: string;
  phoneNumber: string;
}

export interface CreateCustomerDto {
  email: string;
  fullName: string;
  legalIdType: string;
  legalId: string;
  phoneNumber: string;
}

// Delivery types
export interface Delivery {
  id: string;
  transactionId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
  phoneNumber: string;
}

export interface CreateDeliveryDto {
  transactionId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
  phoneNumber: string;
}

// Transaction types
export type TransactionStatus = "PENDING" | "APPROVED" | "DECLINED" | "ERROR";

export interface Transaction {
  id: string;
  productId: string;
  customerId: string;
  quantity: number;
  totalAmount: number;
  status: TransactionStatus;
  wompiTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  productId: string;
  customerId: string;
  quantity: number;
}

// Payment types
export interface PayTransactionDto {
  cardToken: string;
  acceptanceToken: string;
  installments: number;
}

export interface TokenizeCardDto {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  cardHolder: string;
}

export interface AcceptanceTokenResponse {
  acceptanceToken: string;
  permalink: string;
}

export interface TokenizeCardResponse {
  id: string;
  status: string;
  data: {
    id: string;
  };
}

// Checkout form data
export interface CheckoutFormData {
  // Contact info
  email: string;
  // Customer info
  fullName: string;
  legalIdType: string;
  legalId: string;
  phoneNumber: string;
  // Shipping address
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode?: string;
  // Payment info
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvc: string;
  installments: number;
}
