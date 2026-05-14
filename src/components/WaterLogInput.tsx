import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import useWaterLog from '../hooks/useWaterLog';

// US 3.3
type Props = {
  planId: number;
  dayNumber: number;
  onLogged: () => void;
};

export default function WaterLogInput({ planId, dayNumber, onLogged }: Props) {
  const { customMl, setCustomMl, feedback, loading, logAmount, handleCustomLog } =
    useWaterLog(planId, dayNumber, onLogged);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Log dit vandindtag</Text>

      <View style={styles.quickButtons}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => logAmount(250)} disabled={loading}>
          <Text style={styles.quickBtnText}>250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => logAmount(500)} disabled={loading}>
          <Text style={styles.quickBtnText}>500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => logAmount(200)} disabled={loading}>
          <Text style={styles.quickBtnText}>1 glas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.customRow}>
        <TextInput
          style={styles.customInput}
          placeholder="Andet (ml)"
          placeholderTextColor="#A09A8A"
          value={customMl}
          onChangeText={setCustomMl}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.customBtn} onPress={handleCustomLog} disabled={loading || !customMl}>
          <Text style={styles.customBtnText}>Tilføj</Text>
        </TouchableOpacity>
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8E3D4',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  quickBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  customRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  customInput: {
    flex: 1,
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E8E3D4',
  },
  customBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  customBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F5F0E1',
  },
  feedback: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
    textAlign: 'center',
  },
});