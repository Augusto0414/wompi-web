import wompiApi from "../../../api/wompi";
import type {
  AcceptanceTokenResponse,
  CreateCustomerDto,
  CreateDeliveryDto,
  CreateTransactionDto,
  Customer,
  Delivery,
  PayTransactionDto,
  TokenizeCardDto,
  TokenizeCardResponse,
  Transaction,
} from "../../../types";

class CheckoutService {
  // Get acceptance token from Wompi
  async getAcceptanceToken(): Promise<AcceptanceTokenResponse> {
    const response = await wompiApi.get<AcceptanceTokenResponse>("/wompi/acceptance-token");
    return response.data;
  }

  // Tokenize credit card
  async tokenizeCard(cardData: TokenizeCardDto): Promise<TokenizeCardResponse> {
    const response = await wompiApi.post<TokenizeCardResponse>("/wompi/tokenize-card", cardData);
    return response.data;
  }

  // Create customer
  async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    const response = await wompiApi.post<Customer>("/customers", customerData);
    return response.data;
  }

  // Create transaction
  async createTransaction(transactionData: CreateTransactionDto): Promise<Transaction> {
    const response = await wompiApi.post<Transaction>("/transactions", transactionData);
    return response.data;
  }

  // Create delivery
  async createDelivery(deliveryData: CreateDeliveryDto): Promise<Delivery> {
    const response = await wompiApi.post<Delivery>("/deliveries", deliveryData);
    return response.data;
  }

  // Process payment
  async payTransaction(transactionId: string, paymentData: PayTransactionDto): Promise<Transaction> {
    const response = await wompiApi.post<Transaction>(`/transactions/${transactionId}/pay`, paymentData);
    return response.data;
  }

  // Get transaction by ID
  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await wompiApi.get<Transaction>(`/transactions/${transactionId}`);
    return response.data;
  }
}

export const checkoutService = new CheckoutService();
