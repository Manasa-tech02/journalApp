import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Icon library
import { colors } from '../theme/colors';

export const CustomHeader = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const isWriteActive = route.name === 'Write';

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Feather name="book-open" size={20} color={colors.text} />
        <Text style={styles.logoText}>Daily Journal</Text>
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Write')} 
          style={styles.navItem}
        >
          <Feather name="edit-2" size={16} color={isWriteActive ? colors.primary : colors.subText} />
          <Text style={[styles.navText, isWriteActive && styles.activeText]}>Write</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('History')} 
          style={[styles.navItem, { marginLeft: 20 }]}
        >
          <Feather name="clock" size={16} color={!isWriteActive ? colors.primary : colors.subText} />
          <Text style={[styles.navText, !isWriteActive && styles.activeText]}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  navContainer: {
    flexDirection: 'row',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  navText: {
    fontSize: 14,
    color: colors.subText,
    fontWeight: '500',
  },
  activeText: {
    color: colors.primary,
    fontWeight: '700',
  },
});