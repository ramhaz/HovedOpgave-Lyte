import { View, Text, StyleSheet } from 'react-native';
import { Review } from '../types/index';
import { neu, C } from '../config/neu';

type Props = {
  review: Review;
};

//export default function ReviewCard({ review }: Props) {
  return (
    <View style={[neu.card, styles.card]}>
      <Text style={styles.stars}>
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </Text>
      <Text style={styles.text}>"{review.text}"</Text>
      <Text style={styles.name}>— {review.name}</Text>
    </View>
  );
//}

const styles = StyleSheet.create({
  card: {
    marginRight: 14,
    width: 260,
  },
  stars: {
    fontSize: 16,
    color: C.gold,
  },
  text: {
    fontSize: 14,
    color: C.textSoft,
    marginTop: 10,
    lineHeight: 21,
  },
  name: {
    fontSize: 13,
    color: C.textMuted,
    marginTop: 8,
    fontWeight: '600',
  },
});
