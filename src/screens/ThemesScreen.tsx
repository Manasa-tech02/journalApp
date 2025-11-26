import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useThemeColors } from '../theme/useTheme';

// Adjust paths to match your project
import { setTheme, ThemeMode } from '../redux/themeSlice';
import { colors } from '../theme/colors'; 

// Mocking RootState type if you don't have it imported
interface RootState {
  theme: { mode: ThemeMode };
}

export const ThemesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const colors = useThemeColors();
  
  // Get current saved theme from Redux
  const currentThemeMode = useSelector((state: RootState) => state.theme.mode);
  
  // Local state to handle selection BEFORE saving
  const [selectedMode, setSelectedMode] = useState<ThemeMode>(currentThemeMode);

  // Sync local state if redux state changes externally
  useEffect(() => {
    setSelectedMode(currentThemeMode);
  }, [currentThemeMode]);

  const handleSave = () => {
    dispatch(setTheme(selectedMode)); // This saves to Redux & Persist
    navigation.goBack();
  };

  const ThemeCard = ({ 
    mode, 
    title, 
    subtitle, 
    iconColor 
  }: { 
    mode: ThemeMode; 
    title: string; 
    subtitle: string;
    iconColor: string; // Hex color or 'gradient'
  }) => {
    const isSelected = selectedMode === mode;

    return (
      <TouchableOpacity 
        style={[
          styles.card, 
          isSelected && styles.cardSelected // Green border if selected
        ]}
        onPress={() => setSelectedMode(mode)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          {/* Icon Box */}
          <View style={[
            styles.iconBox, 
            mode === 'auto' ? styles.iconBoxGradient : { backgroundColor: iconColor },
            mode === 'light' && styles.iconBoxBorder // Add border for light box so it's visible
          ]} />

          {/* Text Info */}
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{title}</Text>
              {isSelected && (
                <Feather name="check" size={18} color={colors.primary} style={{ marginLeft: 8 }} />
              )}
            </View>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Themes</Text>
      </View>

      <View style={styles.content}>
        
        {/* Light Theme */}
        <ThemeCard 
          mode="light"
          title="Light"
          subtitle="A bright and clean interface"
          iconColor="#FFFFFF"
        />

        {/* Dark Theme */}
        <ThemeCard 
          mode="dark"
          title="Dark"
          subtitle="Easy on the eyes in low light"
          iconColor="#1F2937" 
        />

        {/* Auto Theme */}
        <ThemeCard 
          mode="auto"
          title="Auto"
          subtitle="Switch based on system settings"
          iconColor="gradient" 
        />

      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Theme Preference</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Cream background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 16, // Space between cards
  },
  // Card Styles
  card: {
    backgroundColor: '#F3F4F6', // Light gray default background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent', // Default border invisible
    padding: 20,
  },
  cardSelected: {
    backgroundColor: '#F0FDF4', // Very light green bg when selected
    borderColor: '#407056',     // Sage Green border
    borderWidth: 1.5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Icon Box Styles
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 16,
  },
  iconBoxBorder: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconBoxGradient: {
    backgroundColor: '#6B7280', // Fallback color
    // Simple gradient simulation using opacity layering if desired, 
    // or just a solid neutral color to represent "System"
    opacity: 0.8, 
  },
  // Text Styles
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  // Footer
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
  },
  saveButton: {
    backgroundColor: '#4E7C64', // Matching the button color in screenshot
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});