// US 5.5 + 5.7 – CartScreen: indkøbskurven.
// Viser alle varer med antal, stykpris og total.
// Brugeren kan ændre antal, fjerne varer og gennemføre køb.
// Bruger CartContext til kurv-data og AuthContext til JWT-token ved køb.

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { neu, C } from '../config/neu';

type Props = {
  onShowOrders?: () => void; // callback til at vise ordrehistorik
};

export default function CartScreen({ onShowOrders }: Props) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart(); // kurv-data
  const { session } = useAuth(); // auth-session til API-kald
  const [loading, setLoading] = useState(false);

  // Vis bekræftelsesdialog før en vare fjernes
  const handleRemove = (productId: number, productName: string) => {
    Alert.alert(
      'Fjern vare',
      `Vil du fjerne "${productName}" fra kurven?`,
      [
        { text: 'Annuller', style: 'cancel' },
        { text: 'Fjern', style: 'destructive', onPress: () => removeItem(productId) },
      ]
    );
  };

  // Håndter køb: vis bekræftelsesdialog, kald API, tøm kurv ved succes
  const handleBuy = () => {
    if (items.length === 0) return;

    Alert.alert(
      'Bekræft køb',
      `Total: ${total.toFixed(2)} kr. Vil du gennemføre købet?`,
      [
        { text: 'Annuller', style: 'cancel' },
        {
          text: 'Køb',
          onPress: async () => {
            if (!session?.access_token) {
              Alert.alert('Fejl', 'Du skal være logget ind for at købe.');
              return;
            }

            setLoading(true);
            const result = await createOrder(items, session.access_token);
            setLoading(false);

            if (result.success) {
              clearCart();
              Alert.alert('Køb gennemført!', 'Din ordre er modtaget. Tak for dit køb!');
            } else {
              // US 5.5.7 – Fejlscenarier: netværk, ugyldig ordre
              Alert.alert('Køb mislykkedes', result.error ?? 'Ukendt fejl opstod.');
            }
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyText}>Din kurv er tom</Text>
        <Text style={styles.emptySubText}>Tilføj produkter fra forsiden</Text>
        {onShowOrders && (
          <TouchableOpacity onPress={onShowOrders} style={[neu.pillBtn, styles.emptyOrdersBtn]}>
            <Text style={styles.emptyOrdersBtnText}>Se ordrehistorik</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Din kurv</Text>
          {onShowOrders && (
            <TouchableOpacity onPress={onShowOrders} style={[neu.inset, styles.ordersBtn]}>
              <Ionicons name="receipt-outline" size={16} color={C.text} />
              <Text style={styles.ordersBtnText}>Ordrer</Text>
            </TouchableOpacity>
          )}
        </View>

        {items.map((item) => (
          <View key={item.productId} style={[neu.card, styles.itemCard]}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.productName}</Text>
              {/* US 5.7.1 – Slet-knap */}
              <TouchableOpacity
                onPress={() => handleRemove(item.productId, item.productName)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.itemPrice}>{item.unitPrice} kr. / stk.</Text>

            {/* US 5.5.4 – Antal-justering */}
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={[neu.inset, styles.qtyBtn]}
                onPress={() => updateQuantity(item.productId, item.quantity - 1)}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity
                style={[neu.inset, styles.qtyBtn]}
                onPress={() => updateQuantity(item.productId, item.quantity + 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.lineTotal}>
                = {(item.unitPrice * item.quantity).toFixed(2)} kr.
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 200 }} />
      </ScrollView>

      {/* Total og køb */}
      <View style={[neu.card, styles.footer]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{total.toFixed(2)} kr.</Text>
        </View>

        <TouchableOpacity
          style={[neu.darkBtn, styles.buyBtn, loading && styles.buyBtnDisabled]}
          onPress={handleBuy}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#F5F0E1" />
          ) : (
            <Text style={styles.buyBtnText}>Gennemfør køb</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: C.bg 
  },
  scroll: { 
    padding: 20, 
    paddingTop: 60
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: C.text 
  },
  ordersBtn: {
     flexDirection: 'row', 
     alignItems: 'center', gap: 6, 
     paddingHorizontal: 14, 
     paddingVertical: 8, 
     borderRadius: 20 
    },
  ordersBtnText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: C.text 
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: { 
    fontSize: 48 
  },
  emptyText: { 
    fontSize: 20, 
    fontWeight: '700',
    color: C.text
   },
  emptySubText: {
     fontSize: 14,
     color: C.textSoft
     },
  emptyOrdersBtn: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyOrdersBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },

  itemCard: { 
    marginBottom: 12
   },
  itemHeader: { 
    flexDirection: 'row',
     justifyContent: 'space-between', 
     alignItems: 'center'
     },
  itemName: { fontSize: 16, 
    fontWeight: '700', 
    color: C.text, 
    flex: 1 
  },
  deleteBtn: {
     padding: 4 
    },
  deleteBtnText: { 
    fontSize: 16, 
    color: C.error, 
    fontWeight: '700' 
  },
  itemPrice: { fontSize: 13, 
    color: C.textSoft,
    marginTop: 4,
    marginBottom: 12
    },

  qtyRow: { flexDirection: 'row'
    , alignItems: 'center',
     gap: 12
     },
  qtyBtn: { width: 36,
     height: 36, 
     justifyContent: 'center', 
     alignItems: 'center',
      borderRadius: 10 
    },
  qtyBtnText: { 
    fontSize: 18,
    fontWeight: '700', 
    color: C.text 
  },
  qtyText: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: C.text, 
    minWidth: 24,
    textAlign: 'center' 
  },
  lineTotal: { fontSize: 14,
     color: C.textSoft,
     marginLeft: 'auto' 
    },

  footer: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    gap: 16,
  },
  totalRow: {
     flexDirection: 'row', 
     justifyContent: 'space-between',
      alignItems: 'center' 
    },
  totalLabel: { 
    fontSize: 18, 
    fontWeight: '700',
     color: C.text 
    },
  totalAmount: {
     fontSize: 22,
      fontWeight: '800',
       color: C.text 
      },
  buyBtn: { 
    marginTop: 4
   },
  buyBtnDisabled: { 
    opacity: 0.6 
  },
  buyBtnText: { 
    color: '#F5F0E1',
     fontSize: 16,
      fontWeight: '700' 
    },
});
