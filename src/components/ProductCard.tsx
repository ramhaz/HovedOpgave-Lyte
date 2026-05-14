import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types/index';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>{product.price} kr.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  desc: {
    fontSize: 14,
    color: '#7A7568',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
  },
});