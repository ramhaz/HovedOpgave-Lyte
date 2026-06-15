// US 5.6 – OrderHistoryScreen: viser brugerens tidligere ordrer.
// Hver ordre vises som et kort med dato, status, vareliste og total.
// Data hentes via useOrderHistory hook (sorteret nyeste først af backend).

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { Order } from '../types/index';
import { neu, C } from '../config/neu';

// OrderCard: viser én ordre med dato, varer og totalpris
function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{date}</Text>
        <View style={[neu.inset, styles.statusBadge]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {order.items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName}>
            {item.quantity}× {item.productName}
          </Text>
          <Text style={styles.itemPrice}>
            {(item.unitPrice * item.quantity).toFixed(2)} kr.
          </Text>
        </View>
      ))}

      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>{order.totalPrice.toFixed(2)} kr.</Text>
      </View>
    </View>
  );
}

type Props = {
  onBack?: () => void;
};

export default function OrderHistoryScreen({ onBack }: Props) {
  const { orders, loading, error } = useOrderHistory();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={C.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Købshistorik</Text>

      {loading && <ActivityIndicator size="large" color={C.text} style={{ marginTop: 40 }} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && orders.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>Ingen ordrer endnu</Text>
          <Text style={styles.emptySubText}>Dine køb vises her</Text>
        </View>
      )}

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 60 },
  backBtn: { marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: C.text, marginBottom: 20 },

  card: { marginBottom: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  date: { fontSize: 14, fontWeight: '600', color: C.text },
  statusBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '600', color: C.textSoft },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  itemName: { fontSize: 14, color: C.text },
  itemPrice: { fontSize: 14, color: C.textSoft },

  divider: { height: 1, backgroundColor: C.inset, marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 15, fontWeight: '700', color: C.text },
  totalAmount: { fontSize: 15, fontWeight: '800', color: C.text },

  emptyContainer: { marginTop: 80, alignItems: 'center', gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 18, fontWeight: '700', color: C.text },
  emptySubText: { fontSize: 14, color: C.textSoft },

  errorText: { color: C.error, textAlign: 'center', marginTop: 40 },
});
