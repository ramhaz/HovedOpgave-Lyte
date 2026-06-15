// US 5.5.3 – ProductCard: viser et produkt med navn, pris og "Tilføj til kurv"-knap.
// Bruger useCart() til at tilføje produktet til den globale kurv-state.

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/index';
import { neu, C } from '../config/neu';
import { useCart } from '../context/CartContext';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart(); // hent addToCart fra CartContext

  // Tilføj produktet til kurven med de nødvendige felter
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
    });
  };

  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.row}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={[neu.inset, styles.priceBadge]}>
          <Text style={styles.price}>{product.price} kr.</Text>
        </View>
      </View>
      <Text style={styles.desc}>{product.description}</Text>
      <TouchableOpacity style={[neu.pillBtn, styles.addBtn]} onPress={handleAddToCart}>
        <Text style={styles.addBtnText}>Tilføj til kurv</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: C.text,
    flex: 1,
  },
  priceBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    padding: 0,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text,
  },
  desc: {
    fontSize: 14,
    color: C.textSoft,
    lineHeight: 20,
    marginBottom: 14,
  },
  addBtn: {
    paddingVertical: 10,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text,
  },
});
