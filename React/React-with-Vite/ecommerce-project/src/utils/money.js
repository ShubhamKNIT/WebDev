export default function formatMoney(amountCents) {
  const sign = (amountCents < 0) ? '-' : '';
  return `${sign}$${Math.abs(amountCents / 100).toFixed(2)}`;
}