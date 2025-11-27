import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// Adjust paths to your project structure
import CustomHeader from '../components/CustomHeader';
import { login } from '../redux/authSlice';
import { useThemeColors } from '../theme/useTheme';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const colors = useThemeColors();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] =useState(false);
const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }
    
    // Simulate API call
    dispatch(login({ email,password}));
    navigation.navigate('Write'); // Or wherever you want to go after login
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      
      <View style={styles.content}>
        
        {/* Page Title with Back Arrow */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={[styles.input,focusedField === 'email' && styles.inputFocused
              ]}
              placeholder="your@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={()=>setFocusedField('email')}
              onBlur={()=> setFocusedField(null)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, focusedField === "password" && styles.inputFocused
            ]}>

            
               <TextInput 
              style={styles.inputField}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              onFocus={()=>setFocusedField('password')}
              onBlur={()=> setFocusedField(null)}

              />
            <TouchableOpacity 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Feather 
                  name={isPasswordVisible ? "eye" : "eye-off"} 
                  size={15} 
                  color={colors.subText} 
                />
            </TouchableOpacity>

            </View>
           
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleLogin}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Cream background
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 32, // Matches large title in screenshot
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  input: {
    backgroundColor: '#FFFFFF', // White input bg
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    flexDirection:'row',
    justifyContent:'space-between',
   
  },
  primaryButton: {
    backgroundColor: '#4E7C64', // Sage Green
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  linkText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
   eyeIcon: {
    padding: 4,
  },
  passwordContainer:{
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    flexDirection: 'row', // align horizontal
    alignItems: 'center', // center vertical
    paddingHorizontal: 16,

  },
  inputField:{
    flex: 1, // Take up all space next to icon
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',


  },
  inputFocused: {
    borderColor: '#4E7C64', // The Sage Green color
    borderWidth: 1.5,        // Slightly thicker border when active
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
// const DRAWER_WIDTH = width * 0.85; // Made slightly wider to fit the cards nicely

// export default function SettingsScreen() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();
//   const colors = useThemeColors();
  
//   // Get User from Redux
//   const user = useSelector((state: RootState) => state.auth.user);
  
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Sage Green Color from your design
//   const THEME_GREEN = '#407060'; 
//   // A Red color for the logout button to indicate destructive action, 
//   // or use THEME_GREEN if you want it to look exactly like the others. 
//   // I'll use a slightly different shade or the same green for consistency.
//   // Let's stick to the theme green for visual consistency as per the previous image request.

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
//             if (!user) {
//                 // Only navigate to login if NOT logged in
//                 navigation.navigate('Login');
//             }
//             // If logged in, Account button just closes drawer (acts as profile view)
//         }
//         else if (action === 'Logout') {
//             // New explicit logout action
//             dispatch(logout());
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
//                     <Ionicons name="menu" size={20} color="#FFF" />
//                 </View>
//                 <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
//             </View>
            
//             <TouchableOpacity onPress={() => handleNavigation()} style={styles.closeButton}>
//               <Ionicons name="close" size={24} color={colors.text} />
//             </TouchableOpacity>
//           </View>

//           {/* Divider removed to match the clean look of the image, or you can keep it light */}
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
//                   <Text style={styles.cardSubtitle}>Light Mode</Text>
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
//                   <Text style={styles.cardSubtitle}>
//                     {user ? user.email : 'Sign in to sync'}
//                   </Text>
//               </View>

//               <Ionicons name="chevron-forward" size={20} color="#FFF" />
//             </TouchableOpacity>

//             {/* LOGOUT CARD - Only visible when signed in */}
//             {user && (
//               <TouchableOpacity 
//                 style={[styles.menuCard, { backgroundColor: THEME_GREEN, marginTop: 10 }]} 
//                 onPress={() => handleNavigation('Logout')}
//                 activeOpacity={0.9}
//               >
//                 <View style={[styles.cardIconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
//                    <Feather name="log-out" size={24} color="#FFF" />
//                 </View>
                
//                 <View style={styles.cardTextContainer}>
//                     <Text style={styles.cardTitle}>Log Out</Text>
//                     <Text style={styles.cardSubtitle}>Sign out of your account</Text>
//                 </View>

//                 <Ionicons name="chevron-forward" size={20} color="#FFF" />
//               </TouchableOpacity>
//             )}

//           </View>

//         </SafeAreaView>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlayContainer: { flex: 1 },
//   backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' }, // Slightly lighter backdrop
//   drawer: {
//     position: 'absolute', right: 0, top: 0, bottom: 0, // Top 0 to make it full height like a drawer
//     width: DRAWER_WIDTH,
//     borderTopLeftRadius: 30, 
//     borderBottomLeftRadius: 30,
//     shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
//     paddingVertical: 20,
//   },
//   safeArea: { flex: 1 },
  
//   // Header Styles
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
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: { fontSize: 28, fontWeight: '800' }, // Bolder and larger
//   closeButton: { padding: 4 },
  
//   divider: { height: 1, width: '100%', marginBottom: 30 },
  
//   menuItems: { paddingHorizontal: 24, gap: 20 },
  
//   // New Card Styles
//   menuCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 16,
//     // Add shadow for depth
//     shadowColor: "#407060",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//     height: 80, // Fixed height for consistency
//   },
//   cardIconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
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
//     color: 'rgba(255, 255, 255, 0.8)', // Slightly faded white
//     fontWeight: '400',
//   },
// });





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
// const DRAWER_WIDTH = width * 0.85; // Made slightly wider to fit the cards nicely

// // CHANGED: Switched from "export default function" to "export const" 
// // to match the Named Import style likely used in your AppNavigator.
// export const SettingsScreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();
//   const colors = useThemeColors();
  
//   // Get User from Redux
//   const user = useSelector((state: RootState) => state.auth.user);
  
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   // Sage Green Color from your design
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
//             if (!user) {
//                 // Only navigate to login if NOT logged in
//                 navigation.navigate('Login');
//             }
//             // If logged in, Account button just closes drawer (acts as profile view)
//         }
//         else if (action === 'Logout') {
//             // New explicit logout action
//             dispatch(logout());
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
//                     <Ionicons name="menu" size={20} color="#FFF" />
//                 </View>
//                 <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
//             </View>
            
//             <TouchableOpacity onPress={() => handleNavigation()} style={styles.closeButton}>
//               <Ionicons name="close" size={24} color={colors.text} />
//             </TouchableOpacity>
//           </View>

//           {/* Divider removed to match the clean look of the image, or you can keep it light */}
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
//                   <Text style={styles.cardSubtitle}>Light Mode</Text>
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
//                   <Text style={styles.cardSubtitle}>
//                     {user ? user.email : 'Sign in to sync'}
//                   </Text>
//               </View>

//               <Ionicons name="chevron-forward" size={20} color="#FFF" />
//             </TouchableOpacity>

//             {/* LOGOUT CARD - Only visible when signed in */}
//             {user && (
//               <TouchableOpacity 
//                 style={[styles.menuCard, { backgroundColor: THEME_GREEN, marginTop: 10 }]} 
//                 onPress={() => handleNavigation('Logout')}
//                 activeOpacity={0.9}
//               >
//                 <View style={[styles.cardIconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
//                    <Feather name="log-out" size={24} color="#FFF" />
//                 </View>
                
//                 <View style={styles.cardTextContainer}>
//                     <Text style={styles.cardTitle}>Log Out</Text>
//                     <Text style={styles.cardSubtitle}>Sign out of your account</Text>
//                 </View>

//                 <Ionicons name="chevron-forward" size={20} color="#FFF" />
//               </TouchableOpacity>
//             )}

//           </View>

//         </SafeAreaView>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlayContainer: { flex: 1 },
//   backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' }, // Slightly lighter backdrop
//   drawer: {
//     position: 'absolute', right: 0, top: 0, bottom: 0, // Top 0 to make it full height like a drawer
//     width: DRAWER_WIDTH,
//     borderTopLeftRadius: 30, 
//     borderBottomLeftRadius: 30,
//     shadowColor: "#000", shadowOffset: { width: -5, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
//     paddingVertical: 20,
//   },
//   safeArea: { flex: 1 },
  
//   // Header Styles
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
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: { fontSize: 28, fontWeight: '800' }, // Bolder and larger
//   closeButton: { padding: 4 },
  
//   divider: { height: 1, width: '100%', marginBottom: 30 },
  
//   menuItems: { paddingHorizontal: 24, gap: 20 },
  
//   // New Card Styles
//   menuCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 16,
//     // Add shadow for depth
//     shadowColor: "#407060",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//     height: 80, // Fixed height for consistency
//   },
//   cardIconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
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
//     color: 'rgba(255, 255, 255, 0.8)', // Slightly faded white
//     fontWeight: '400',
//   },
// });