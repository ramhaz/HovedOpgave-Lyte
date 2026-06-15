// US 3.3 – WaterLogInput: input-komponent til at logge vandindtag.
// Har quick-buttons (250ml, 500ml) og et custom input-felt.
// Bruger useWaterLog hook til al logik.

import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import useWaterLog from '../hooks/useWaterLog';
import { neu, C } from '../config/neu';

type Props = {
  planId: number;
  dayNumber: number;
  onLogged: () => void; // callback der kører efter succesfuld logning
};

export default function WaterLogInput({ planId, dayNumber, onLogged }: Props) {
  const { customMl, setCustomMl, feedback, loading, logAmount, handleCustomLog } =
    useWaterLog(planId, dayNumber, onLogged);

  return (
    <View style={[neu.card, styles.card]}>
      <Text style={styles.label}>Log vandindtag</Text>

      <View style={styles.quickButtons}>
        {[{ label: '250 ml', ml: 250 }, { label: '500 ml', ml: 500 }].map((btn) => (
          <TouchableOpacity
            key={btn.label}
            style={[neu.inset, styles.quickBtn]}
            onPress={() => logAmount(btn.ml)}
            disabled={loading}
          >
            <Text style={styles.quickBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customRow}>
        <TextInput
          style={[neu.inset, styles.customInput]}
          placeholder="Anden mængde (ml)"
          placeholderTextColor={C.textMuted}
          value={customMl}
          onChangeText={setCustomMl}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[neu.darkBtn, styles.addBtn]}
          onPress={handleCustomLog}
          disabled={loading || !customMl}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
    marginBottom: 16,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  quickBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  quickBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },
  customRow: {
    flexDirection: 'row',
    gap: 10,
  },
  customInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: C.text,
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 28,
    fontWeight: '300',
    color: C.bg,
    lineHeight: 32,
  },
  feedback: {
    fontSize: 14,
    fontWeight: '600',
    color: C.success,
    marginTop: 12,
    textAlign: 'center',
  },
});
