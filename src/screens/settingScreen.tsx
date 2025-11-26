import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen width to calculate drawer width (75% of screen)
const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75; 

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // Animation Values
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current; // Starts off-screen (right)
  const fadeAnim = useRef(new Animated.Value(0)).current; // Starts transparent

  // 1. Animate In (Open) on Mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to position 0 (visible)
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 2. Animate Out (Close) Function
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH, // Slide back off-screen
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack(); // Actually close the screen after animation
    });
  };

  return (
    <View style={styles.overlayContainer}>
      
     // {/* 3. Transparent Backdrop (Tap to close) */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* 4. Sliding Menu Drawer */}
      <Animated.View 
        style={[
          styles.drawer, 
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Header with "Menu" and Cross Icon */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Menu Buttons */}
          <View style={styles.menuItems}>
            
            {/* Themes Button */}
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={() => console.log("Navigate to Themes")}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="color-palette-outline" size={22} color="#1F2937" />
              </View>
              <Text style={styles.menuText}>Themes</Text>
            </TouchableOpacity>
            
            {/* Account Button */}
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={() => console.log("Navigate to Account")}
            >
              <View style={styles.iconContainer}>
                <Feather name="user" size={22} color="#1F2937" />
              </View>
              <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    // Ensure this screen is presented as 'transparentModal' in navigation config
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark transparent background
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FDFBF7', // Cream background to match theme
    
    // Curved Borders on the left side
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  closeButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 20,
  },
  menuItems: {
    paddingHorizontal: 24,
    gap: 8,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  menuText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});