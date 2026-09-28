'use server';

import { fetchAPI } from '@/lib/api';
import { revalidatePath } from 'next/cache';

interface CheckoutItem {
  product_id: number;
  quantity: number;
}

export async function checkout(items: CheckoutItem[]) {
  const orderData = await fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });

  const orderId = orderData.order.id;

  const paymentData = await fetchAPI(`/payments/${orderId}`, {
    method: 'POST',
  });

  revalidatePath('/history');

  return {
    orderId,
    paymentIntentId: paymentData.payment_intent_id,
    amount: paymentData.amount,
  };
}