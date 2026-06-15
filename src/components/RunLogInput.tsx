// RunLogInput: input-komponent til at logge løbeture.
// Quick-buttons (0.5 km, 1.0 km) og custom input-felt.
// Samme layout som WaterLogInput, men for km.

import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import useRunLog from '../hooks/useRunLog';
import { neu, C } from '../config/neu';

type Props = {
  planId: number;
  dayNumber: number;
  onLogged: () => void;
};

export default function RunLogInput({ planId, dayNumber, onLogged }: Props) {
  const { customKm, setCustomKm, feedback, loading, logAmount, handleCustomLog } =
    useRunLog(planId, dayNumber, onLogged);

  return (
    <View style={[neu.card, styles.card]}>
      <Text style={styles.label}>Log din løbetur</Text>

      <View style={styles.quickButtons}>
        {[{ label: '0.5 km', km: 0.5 }, { label: '1.0 km', km: 1.0 }].map((btn) => (
          <TouchableOpacity
            key={btn.label}
            style={[neu.inset, styles.quickBtn]}
            onPress={() => logAmount(btn.km)}
            disabled={loading}
          >
            <Text style={styles.quickBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customRow}>
        <TextInput
          style={[neu.inset, styles.customInput]}
          placeholder="Anden distance (km)"
          placeholderTextColor={C.textMuted}
          value={customKm}
          onChangeText={setCustomKm}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          style={[neu.darkBtn, styles.addBtn]}
          onPress={handleCustomLog}
          disabled={loading || !customKm}
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
