import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ingredient } from '../types/index';
import { neu, C } from '../config/neu';

type Props = {
  ingredients: Ingredient[];
};

export default function IngredientPills({ ingredients }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {ingredients.map((i) => (
        <View key={i.id} style={[neu.inset, styles.pill]}>
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
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: C.text,
  },
  amount: {
    fontSize: 12,
    color: C.textSoft,
    marginTop: 2,
  },
});
