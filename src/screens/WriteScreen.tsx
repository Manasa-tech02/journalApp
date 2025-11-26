import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

// Imports
import { useThemeColors } from '../theme/useTheme';
import CustomHeader from '../components/CustomHeader';
import { addEntry, updateEntry, JournalEntry } from '../redux/journalSlice';
import { RootStackParamList } from '../navigation/AppNavigator';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

export const WriteScreen = () => {
  const colors = useThemeColors(); // ✅ Hook initialized here
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<WriteScreenRouteProp>();
  
  const existingEntry = route.params?.entry;

  const now = new Date();
  const displayDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const displayTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  useEffect(() => {
    if (existingEntry) {
      setContent(existingEntry.content);
      
      if (inputRef.current) {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
          inputRef.current?.setNativeProps({
            selection: { start: existingEntry.content.length, end: existingEntry.content.length },
          });
        });
      }
    } else {
      setContent('');
    }
  }, [existingEntry]);

  const handleSave = () => {
    if (!content.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }

    const entry: JournalEntry = {
      id: existingEntry ? existingEntry.id : Date.now().toString(),
      date: new Date().toISOString(),
      displayDate: existingEntry ? existingEntry.displayDate : displayDate,
      time: existingEntry ? existingEntry.time : displayTime,
      content,
    };

    if (existingEntry) {
      dispatch(updateEntry(entry));
      Alert.alert('Updated', 'Your journal entry has been updated!');
    } else {
      dispatch(addEntry(entry));
      Alert.alert('Saved', 'Your thoughts have been captured!');
      setContent(''); 
    }
    
    navigation.navigate('History');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <CustomHeader />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Today's Entry</Text>
          <Text style={[styles.headerSubtitle, { color: colors.subText }]}>
            Take a moment to reflect on your day and capture your thoughts.
          </Text>

          <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.dateText, { color: colors.text }]}>
              {existingEntry ? existingEntry.displayDate : displayDate}
            </Text>
            <View style={styles.timeContainer}>
              <Feather name="clock" size={14} color={colors.subText} />
              <Text style={[styles.timeText, { color: colors.subText }]}>
                {existingEntry ? existingEntry.time : displayTime}
              </Text>
            </View>

            <View style={styles.promptContainer}>
              <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                <Feather name="sun" size={16} color={colors.subText} />
                <Text style={[styles.promptText, { color: colors.subText }]}>How was your day?</Text>
              </View>
              <Text style={[styles.charCount, { color: colors.placeholder }]}>
                {content.length} characters
              </Text>
            </View>

            <TextInput
              ref={inputRef}
              style={[
                styles.input, 
                { 
                  color: colors.text, 
                  backgroundColor: colors.inputBg, 
                  borderColor: colors.border 
                },
                isFocused && { borderColor: colors.primary, borderWidth: 1.5 }
              ]}
              multiline
              placeholder="Start writing about your day..."
              placeholderTextColor={colors.placeholder}
              value={content}
              onChangeText={setContent}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]} 
            onPress={handleSave}
          >
            <Feather name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>
              {existingEntry ? "Update Entry" : "Save Entry"}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ✅ FIXED: No 'colors' variables used here
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, marginBottom: 24, lineHeight: 22 },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  dateText: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  timeContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 20 },
  timeText: { fontSize: 14 },
  promptContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  promptText: { fontSize: 14, fontWeight: '500' },
  charCount: { fontSize: 12 },
  input: {
    minHeight: 300,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginTop: 10,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});