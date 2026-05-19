import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types/index';
import { neu, C } from '../config/neu';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <View style={[neu.card, styles.card]}>
      <View style={styles.row}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={[neu.inset, styles.priceBadge]}>
          <Text style={styles.price}>{product.price} kr.</Text>
        </View>
      </View>
      <Text style={styles.desc}>{product.description}</Text>
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
  },
});
