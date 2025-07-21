export const BoothStatus = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  PURCHASED: 'purchased',
  IN_CART: 'in_cart'
} as const;

export const BoothStatusColors = {
  [BoothStatus.AVAILABLE]: '#2ecc71',
  [BoothStatus.RESERVED]: '#e74c3c',
  [BoothStatus.PURCHASED]: '#e74c3c',
  [BoothStatus.IN_CART]: '#95a5a6'
} as const;