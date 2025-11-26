import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CustomHeader() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const isActive = (screenName: string) => route.name === screenName;

  return (
    <View style={styles.headerContainer}>
      {/* Left: Logo/Title */}
      <View style={styles.logoContainer}>
        <Feather name="book-open" size={20} color="#1F2937" style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Daily Journal</Text>
      </View>

      {/* Right: Navigation Links */}
      <View style={styles.navContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Write')}
          style={[styles.navItem, isActive('Write') && styles.activeNavItem]}
        >
          <Feather name="edit-2" size={16} color={isActive('Write') ? "#1F2937" : "#6B7280"} />
          <Text style={[styles.navText, isActive('Write') ? styles.activeNavText : styles.inactiveNavText]}>
            Write
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('History')}
          style={[styles.navItem, isActive('History') && styles.activeNavItem]}
        >
          <Feather name="clock" size={16} color={isActive('History') ? "#1F2937" : "#6B7280"} />
          <Text style={[styles.navText, isActive('History') ? styles.activeNavText : styles.inactiveNavText]}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.menuButton}
        >
          <Ionicons name="menu-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FDFBF7', // Cream background to match screenshot
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Serif font for "Daily Journal"
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeNavItem: {
    opacity: 1,
  },
  activeNavText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  inactiveNavText: {
    color: '#6B7280',
  },
  menuButton: {
    marginLeft: 10,
  }
});