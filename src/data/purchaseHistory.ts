// Mock purchase history for authenticated users
export interface PurchaseHistoryItem {
  productId: string;
  productName: string;
  purchaseDate: string; // ISO format
  quantity: number;
}

export interface UserPurchaseHistory {
  email: string;
  purchases: PurchaseHistoryItem[];
}

// Mock purchase history data
export const mockPurchaseHistory: UserPurchaseHistory[] = [
  {
    email: 'demo@andrewlessman.com',
    purchases: [
      {
        productId: '2', // Gentle Fiber
        productName: 'Gentle Fiber',
        purchaseDate: '2025-12-15T10:30:00Z', // About 3 weeks ago
        quantity: 1
      },
      {
        productId: '3', // Ultimate CoQ-10
        productName: 'Ultimate CoQ-10',
        purchaseDate: '2025-11-20T14:20:00Z', // About 6 weeks ago
        quantity: 2
      }
    ]
  }
];

// Helper function to get user's purchase history
export function getUserPurchaseHistory(email: string): PurchaseHistoryItem[] {
  const userHistory = mockPurchaseHistory.find(
    (history) => history.email.toLowerCase() === email.toLowerCase()
  );
  return userHistory?.purchases || [];
}

// Helper function to check if user owns a specific product
export function userOwnsProduct(email: string, productId: string): boolean {
  const purchases = getUserPurchaseHistory(email);
  return purchases.some((purchase) => purchase.productId === productId);
}

// Helper function to get product names user owns
export function getUserProductNames(email: string): string[] {
  const purchases = getUserPurchaseHistory(email);
  return purchases.map((purchase) => purchase.productName);
}

// Helper function to get time since purchase
export function getTimeSincePurchase(purchaseDate: string): string {
  const now = new Date();
  const purchase = new Date(purchaseDate);
  const diffTime = Math.abs(now.getTime() - purchase.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) {
    return 'last week';
  } else if (diffDays < 14) {
    return 'a couple weeks ago';
  } else if (diffDays < 30) {
    return 'a few weeks ago';
  } else if (diffDays < 60) {
    return 'last month';
  } else {
    return 'recently';
  }
}