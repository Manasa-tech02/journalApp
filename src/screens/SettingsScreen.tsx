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
const DRAWER_WIDTH = width * 0.85; // Made slightly wider to fit the cards nicely

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const colors = useThemeColors();
  
  // Get User from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Sage Green Color from your design
  const THEME_GREEN = '#407060'; 

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
                dispatch(logout());
            } else {
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
          { transform: [{ translateX: slideAnim }], backgroundColor: colors.background || '#FFFFFF' } 
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
                {/* Green Circle Menu Icon */}
                <View style={[styles.headerIconCircle, { backgroundColor: THEME_GREEN }]}>
                    <Ionicons name="menu" size={18} color="#FFF" />
                </View>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
            </View>
            
            <TouchableOpacity onPress={() => handleNavigation()} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Divider removed to match the clean look of the image, or you can keep it light */}
          <View style={[styles.divider, { backgroundColor: '#F0F0F0' }]} />

          {/* Menu Items */}
          <View style={styles.menuItems}>
            
            {/* THEMES CARD */}
            <TouchableOpacity 
              style={[styles.menuCard, { backgroundColor: THEME_GREEN }]}
              onPress={() => handleNavigation('Themes')}
              activeOpacity={0.9}
            >
              <View style={styles.cardIconCircle}>
                <Ionicons name="color-palette-outline" size={24} color="#FFF" />
              </View>
              
              <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Themes</Text>
                  
              </View>

              <Ionicons name="chevron-forward" size={20} color="#FFF" />
            </TouchableOpacity>
            
            {/* ACCOUNT CARD */}
            <TouchableOpacity 
              style={[styles.menuCard, { backgroundColor: THEME_GREEN }]} 
              onPress={() => handleNavigation('Account')}
              activeOpacity={0.9}
            >
              <View style={styles.cardIconCircle}>
                 <Feather name={user ? "user" : "log-in"} size={24} color="#FFF" />
              </View>
              
              <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Account</Text>
                  <Text style={styles.cardSubtitle}>
                    {user ? user.email : 'Sign in to sync'}
                  </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#FFF" />
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: { flex: 1 ,backgroundColor: '#FDFCF8'},
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' }, // Slightly lighter backdrop
  drawer: {
    position: 'absolute', right: 0, top: 0, bottom: 0, // Top 0 to make it full height like a drawer
    width: DRAWER_WIDTH,
    borderTopLeftRadius: 30, 
    borderBottomLeftRadius: 30,
    shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
    paddingVertical: 20,
  },
  safeArea: { flex: 1 },
  
  // Header Styles
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    marginBottom: 10,
    marginTop: Platform.OS === 'android' ? 20 : 0
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28, fontWeight: '800' }, // Bolder and larger
  closeButton: { padding: 4 },
  
  divider: { height: 1, width: '100%', marginBottom: 30 },
  
  menuItems: { paddingHorizontal: 24, gap: 20 },
  
  // New Card Styles
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    // Add shadow for depth
    shadowColor: "#407060",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    height: 80, // Fixed height for consistency
  },
  cardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)', // Slightly faded white
    fontWeight: '400',
  },
});




// import React, { useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   Animated, 
//   Dimensions, 
//   TouchableWithoutFeedback,
//   Platform
// } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useDispatch, useSelector } from 'react-redux';

// // Imports
// import { RootStackParamList } from '../navigation/AppNavigator';
// import { useThemeColors } from '../theme/useTheme';
// import { logout } from '../redux/authSlice';
// import { RootState } from '../redux/store';

// const { width } = Dimensions.get('window');
// const DRAWER_WIDTH = width * 0.85;

// // CHANGED: Fixed the export to 'export const' to resolve the "invalid value for component" error
// export const SettingsScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();
//   const colors = useThemeColors();
  
//   // Get User from Redux
//   const user = useSelector((state: RootState) => state.auth.user);
  
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Sage Green Color
//   const THEME_GREEN = '#407060'; 

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
//       Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const handleNavigation = (action?: string) => {
//     Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
//         Animated.timing(slideAnim, { toValue: DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
//     ]).start(() => {
//         navigation.goBack(); // Close modal
        
//         if (action === 'Themes') {
//             navigation.navigate('Themes');
//         } 
//         else if (action === 'Account') {
//             // CHANGED LOGIC:
//             // If NOT logged in, navigate to Login.
//             // If logged in, just close the drawer (or you can add other profile logic here).
//             if (!user) {
//                 navigation.navigate('Login');
//             }
//         }
//         else if (action === 'Logout') {
//              dispatch(logout());
//         }
//     });
//   };

//   return (
//     <View style={styles.overlayContainer}>
//       <TouchableWithoutFeedback onPress={() => handleNavigation()}>
//         <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
//       </TouchableWithoutFeedback>

//       <Animated.View 
//         style={[
//           styles.drawer, 
//           { transform: [{ translateX: slideAnim }], backgroundColor: colors.background || '#FFFFFF' } 
//         ]}
//       >
//         <SafeAreaView style={styles.safeArea}>
          
//           {/* Header Section */}
//           <View style={styles.header}>
//             <View style={styles.headerTitleContainer}>
//                 {/* Green Circle Menu Icon */}
//                 <View style={[styles.headerIconCircle, { backgroundColor: THEME_GREEN }]}>
//                     <Ionicons name="menu" size={18} color="#FFF" />
//                 </View>
//                 <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
//             </View>
            
//             <TouchableOpacity onPress={() => handleNavigation()} style={styles.closeButton}>
//               <Ionicons name="close" size={24} color={colors.text} />
//             </TouchableOpacity>
//           </View>

//           {/* Divider */}
//           <View style={[styles.divider, { backgroundColor: '#F0F0F0' }]} />

//           {/* Menu Items */}
//           <View style={styles.menuItems}>
            
//             {/* THEMES CARD */}
//             <TouchableOpacity 
//               style={[styles.menuCard, { backgroundColor: THEME_GREEN }]}
//               onPress={() => handleNavigation('Themes')}
//               activeOpacity={0.9}
//             >
//               <View style={styles.cardIconCircle}>
//                 <Ionicons name="color-palette-outline" size={24} color="#FFF" />
//               </View>
              
//               <View style={styles.cardTextContainer}>
//                   <Text style={styles.cardTitle}>Themes</Text>
                 
//               </View>

//               <Ionicons name="chevron-forward" size={20} color="#FFF" />
//             </TouchableOpacity>
            
//             {/* ACCOUNT CARD */}
//             <TouchableOpacity 
//               style={[styles.menuCard, { backgroundColor: THEME_GREEN }]} 
//               onPress={() => handleNavigation('Account')}
//               activeOpacity={0.9}
//             >
//               <View style={styles.cardIconCircle}>
//                  <Feather name={user ? "user" : "log-in"} size={24} color="#FFF" />
//               </View>
              
//               <View style={styles.cardTextContainer}>
//                   <Text style={styles.cardTitle}>Account</Text>
//                   {/* CHANGED: Shows User Email if logged in, otherwise 'Sign in to sync' */}
//                   <Text style={styles.cardSubtitle}>
//                     {user ? user.email : 'Sign in to sync'}
//                   </Text>
//               </View>

//               <Ionicons name="chevron-forward" size={20} color="#FFF" />
//             </TouchableOpacity>

//             {/* Added Logout back as a separate option so user can sign out */}
//             {user && (
//               <TouchableOpacity 
//                 style={[styles.menuCard, { backgroundColor: THEME_GREEN, marginTop: 10 }]} 
//                 onPress={() => handleNavigation('Logout')}
//                 activeOpacity={0.9}
//               >
//                  <View style={styles.cardIconCircle}>
//                      <Feather name="log-out" size={24} color="#FFF" />
//                  </View>
//                  <View style={styles.cardTextContainer}>
//                     <Text style={styles.cardTitle}>Log Out</Text>
//                     <Text style={styles.cardSubtitle}>Sign out of your account</Text>
//                  </View>
//                  <Ionicons name="chevron-forward" size={20} color="#FFF" />
//               </TouchableOpacity>
//             )}

//           </View>

//         </SafeAreaView>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlayContainer: { flex: 1 },
//   backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
//   drawer: {
//     position: 'absolute', right: 0, top: 0, bottom: 0, 
//     width: DRAWER_WIDTH,
//     borderTopLeftRadius: 30, 
//     borderBottomLeftRadius: 30,
//     shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
//     paddingVertical: 20,
//   },
//   safeArea: { flex: 1 },
  
//   header: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     paddingHorizontal: 24, 
//     marginBottom: 10,
//     marginTop: Platform.OS === 'android' ? 20 : 0
//   },
//   headerTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   headerIconCircle: {
//     width: 30,
//     height: 30,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: { fontSize: 28, fontWeight: '800' },
//   closeButton: { padding: 4 },
  
//   divider: { height: 1, width: '100%', marginBottom: 30 },
  
//   menuItems: { paddingHorizontal: 24, gap: 20 },
  
//   menuCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 16,
//     shadowColor: "#407060",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//     height: 80,
//   },
//   cardIconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   cardTextContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)', 
//     fontWeight: '400',
//   },
// });