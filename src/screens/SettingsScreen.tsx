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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

// Imports
import { RootStackParamList } from '../navigation/AppNavigator';
import { useThemeColors } from '../theme/useTheme';
import { logout } from '../redux/authSlice';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8; 

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const colors = useThemeColors();
  
  // Get User from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleNavigation = (action?: string) => {
    Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
    ]).start(() => {
        navigation.goBack(); // Close modal
        
        if (action === 'Themes') {
            navigation.navigate('Themes');
        } 
        else if (action === 'Account') {
            if (user) {
                // If logged in, log out
                dispatch(logout());
            } else {
                // If not logged in, go to Login
                navigation.navigate('Login');
            }
        }
    });
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableWithoutFeedback onPress={() => handleNavigation()}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View 
        style={[
          styles.drawer, 
          { transform: [{ translateX: slideAnim }], backgroundColor: colors.cardBg } 
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
            <TouchableOpacity onPress={() => handleNavigation()} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.menuItems}>
            
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={() => handleNavigation('Themes')}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="color-palette-outline" size={22} color={colors.text} />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>Themes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuOption} 
              onPress={() => handleNavigation('Account')}
            >
              <View style={styles.iconContainer}>
                {/* Change icon based on auth state */}
                <Feather name={user ? "log-out" : "user"} size={22} color={colors.text} />
              </View>
              {/* Change text based on auth state */}
              <Text style={[styles.menuText, { color: colors.text }]}>
                {user ? user.email : 'Account'}
              </Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: { flex: 1 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  drawer: {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: DRAWER_WIDTH,
    borderTopLeftRadius: 30, borderBottomLeftRadius: 30,
    shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
  },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
  headerTitle: { fontSize: 24, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  closeButton: { padding: 4 },
  divider: { height: 1, marginBottom: 20 },
  menuItems: { paddingHorizontal: 24, gap: 15 },
  menuOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  iconContainer: { width: 40, alignItems: 'flex-start' },
  menuText: { fontSize: 18, fontWeight: '500' },
});