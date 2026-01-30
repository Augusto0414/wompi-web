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

/**
 * CheckoutService - Handles all checkout-related API calls
 *
 * Flow:
 * 1. getAcceptanceToken() - Get Wompi acceptance token
 * 2. tokenizeCard() - Tokenize credit card
 * 3. createCustomer() - Create or get customer
 * 4. createTransaction() - Create transaction for each product
 * 5. createDelivery() - Add delivery info to transaction
 * 6. payTransaction() - Process the payment
 */
class CheckoutService {
  /**
   * Get acceptance token from Wompi
   * Required before processing any payment
   */
  async getAcceptanceToken(): Promise<AcceptanceTokenResponse> {
    const response = await wompiApi.get<AcceptanceTokenResponse>("/wompi/acceptance-token");
    return response.data;
  }

  /**
   * Tokenize credit card
   * Converts card details to a secure token for payment processing
   */
  async tokenizeCard(cardData: TokenizeCardDto): Promise<TokenizeCardResponse> {
    const response = await wompiApi.post<TokenizeCardResponse>("/wompi/tokenize-card", cardData);
    return response.data;
  }

  /**
   * Create a new customer
   */
  async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    const response = await wompiApi.post<Customer>("/customers", customerData);
    return response.data;
  }

  /**
   * Get customer by ID
   */
  async getCustomer(customerId: string): Promise<Customer> {
    const response = await wompiApi.get<Customer>(`/customers/${customerId}`);
    return response.data;
  }

  /**
   * Create a new transaction
   */
  async createTransaction(transactionData: CreateTransactionDto): Promise<Transaction> {
    const response = await wompiApi.post<Transaction>("/transactions", transactionData);
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await wompiApi.get<Transaction>(`/transactions/${transactionId}`);
    return response.data;
  }

  /**
   * Create delivery information for a transaction
   */
  async createDelivery(deliveryData: CreateDeliveryDto): Promise<Delivery> {
    const response = await wompiApi.post<Delivery>("/deliveries", deliveryData);
    return response.data;
  }

  /**
   * Get delivery by transaction ID
   */
  async getDeliveryByTransaction(transactionId: string): Promise<Delivery> {
    const response = await wompiApi.get<Delivery>(`/deliveries/transaction/${transactionId}`);
    return response.data;
  }

  /**
   * Process payment for a transaction
   * This is the final step that charges the card
   */
  async payTransaction(transactionId: string, paymentData: PayTransactionDto): Promise<Transaction> {
    const response = await wompiApi.post<Transaction>(`/transactions/${transactionId}/pay`, paymentData);
    return response.data;
  }
}

export const checkoutService = new CheckoutService();
