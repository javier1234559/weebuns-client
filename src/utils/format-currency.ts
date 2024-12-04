export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount)
}
