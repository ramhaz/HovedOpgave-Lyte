import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import useSleepLog from '../hooks/useSleepLog';
import { neu, C } from '../config/neu';

type Props = {
  planId: number;
  dayNumber: number;
  onLogged: () => void;
};

export default function SleepLogInput({ planId, dayNumber, onLogged }: Props) {
  const { customHours, setCustomHours, feedback, loading, logAmount, handleCustomLog } =
    useSleepLog(planId, dayNumber, onLogged);

  return (
    <View style={[neu.card, styles.card]}>
      <Text style={styles.label}>Log din søvn</Text>

      <View style={styles.quickButtons}>
        {[{ label: '6 timer', hours: 6 }, { label: '7 timer', hours: 7 }, { label: '8 timer', hours: 8 }].map((btn) => (
          <TouchableOpacity
            key={btn.label}
            style={[neu.inset, styles.quickBtn]}
            onPress={() => logAmount(btn.hours)}
            disabled={loading}
          >
            <Text style={styles.quickBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customRow}>
        <TextInput
          style={[neu.inset, styles.customInput]}
          placeholder="Antal timer (f.eks. 6.5)"
          placeholderTextColor={C.textMuted}
          value={customHours}
          onChangeText={setCustomHours}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          style={[neu.darkBtn, styles.addBtn]}
          onPress={handleCustomLog}
          disabled={loading || !customHours}
        >
          <Text style={styles.addBtnText}>OK</Text>
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
    fontSize: 18,
    fontWeight: '600',
    color: C.bg,
    lineHeight: 22,
  },
  feedback: {
    fontSize: 14,
    fontWeight: '600',
    color: C.success,
    marginTop: 12,
    textAlign: 'center',
  },
});
