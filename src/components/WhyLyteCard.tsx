import { View, Text, StyleSheet } from 'react-native';

type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function WhyLyteCard({ icon, title, description }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: '#cebc92',
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  desc: {
    fontSize: 13,
    color: '#7A7568',
    marginTop: 4,
    lineHeight: 19,
  },
});