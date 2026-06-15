// WhyLyteCard: kort der viser et selling point med ikon, titel og beskrivelse.
// Bruges på forsiden under "Sådan virker det"-sektionen.

import { View, Text, StyleSheet } from 'react-native';
import { neu, C } from '../config/neu';

type Props = {
  icon: string;       // emoji-ikon
  title: string;
  description: string;
};

export default function WhyLyteCard({ icon, title, description }: Props) {
  return (
    <View style={[neu.cardSm, styles.card]}>
      <View style={[neu.inset, styles.iconBox]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 14,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  desc: {
    fontSize: 13,
    color: C.textSoft,
    marginTop: 4,
    lineHeight: 19,
  },
});
