import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ingredient } from '../types/index';

type Props = {
  ingredients: Ingredient[];
};

export default function IngredientPills({ ingredients }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {ingredients.map((i) => (
        <View key={i.id} style={styles.pill}>
          <Text style={styles.name}>{i.name}</Text>
          <Text style={styles.amount}>
            {i.amount} {i.unit}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  amount: {
    fontSize: 12,
    color: '#7A7568',
    marginTop: 2,
  },
});