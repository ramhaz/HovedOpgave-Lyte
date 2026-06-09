import { useState } from 'react';
import CartScreen from '../../src/screens/CartScreen';
import OrderHistoryScreen from '../../src/screens/OrderHistoryScreen';

export default function CartTab() {
  const [showOrders, setShowOrders] = useState(false);

  if (showOrders) {
    return <OrderHistoryScreen onBack={() => setShowOrders(false)} />;
  }

  return <CartScreen onShowOrders={() => setShowOrders(true)} />;
}
