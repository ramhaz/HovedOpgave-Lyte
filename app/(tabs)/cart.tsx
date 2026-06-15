// Tab-wrapper for kurv: skifter mellem CartScreen og OrderHistoryScreen.
// useState bruges til at toggle mellem de to skærme.
import { useState } from 'react';
import CartScreen from '../../src/screens/CartScreen';
import OrderHistoryScreen from '../../src/screens/OrderHistoryScreen';

export default function CartTab() {
  const [showOrders, setShowOrders] = useState(false); // toggle kurv/ordrehistorik

  // Vis ordrehistorik med back-knap til kurven
  if (showOrders) {
    return <OrderHistoryScreen onBack={() => setShowOrders(false)} />;
  }

  // Vis kurven med knap til ordrehistorik
  return <CartScreen onShowOrders={() => setShowOrders(true)} />;
}
