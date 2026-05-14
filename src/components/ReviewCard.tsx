import { View, Text, StyleSheet } from 'react-native';
import { Review } from '../types/index';

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.stars}>
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </Text>
      <Text style={styles.text}>"{review.text}"</Text>
      <Text style={styles.name}>— {review.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 260,
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  stars: {
    fontSize: 16,
    color: '#C4A44A',
  },
  text: {
    fontSize: 14,
    color: '#4A4539',
    marginTop: 8,
    lineHeight: 20,
  },
  name: {
    fontSize: 13,
    color: '#A09A8A',
    marginTop: 8,
  },
});