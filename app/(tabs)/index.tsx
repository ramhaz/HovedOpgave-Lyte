import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import useHomeData from '../../src/hooks/useHomeData';
import { sellingPoints } from '../../src/data/sellingPoints';
import HeroSection from '../../src/components/HeroSection';
import ProductCard from '../../src/components/ProductCard';
import IngredientPills from '../../src/components/IngredientPills';
import RoadmapTeaser from '../../src/components/RoadmapTeaser';
import ReviewCard from '../../src/components/ReviewCard';
import WhyLyteCard from '../../src/components/WhyLyteCard';

export default function HomeScreen() {
  const { products, ingredients, reviews, loading } = useHomeData();

  return (
    <ScrollView style={styles.container}>
      
      <HeroSection /> 
  
      <RoadmapTeaser/>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hvorfor LYTE?</Text>
        {sellingPoints.map((sp, index) => (
          <WhyLyteCard
            key={index}
            icon={sp.icon}
            title={sp.title}
            description={sp.description}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nøgleingredienser</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#1A1A1A" />
        ) : (
          <IngredientPills
            ingredients={ingredients.filter((i) => i.productId === 1)}
          />
        )}
      </View>



      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vores produkter</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#1A1A1A" />
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </View>



      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kundeanmeldelser</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#1A1A1A" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </ScrollView>
        )}
      </View>


      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E1',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
});