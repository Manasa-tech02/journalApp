import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Imports
import { useThemeColors } from '../theme/useTheme';
import CustomHeader from '../components/CustomHeader';
import { RootState } from '../redux/store';
import { JournalEntry, deleteEntry } from '../redux/journalSlice';

export const HistoryScreen = () => {
  const colors = useThemeColors();
  const entries = useSelector((state: RootState) => state.journal.entries);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

 
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => dispatch(deleteEntry(id)) 
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: JournalEntry }) => {
   
    const titleText = item.content 
      ? (item.content.length > 30 ? item.content.substring(0, 30) + '...' : item.content.split('\n')[0])
      : 'Untitled Entry';

    return (
      <View style={[
        styles.card, 
        { backgroundColor: colors.cardBg, borderColor: colors.border }
      ]}>
        
        {/* Content Area (Click to Edit) */}
        <TouchableOpacity 
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('Write', { entry: item })}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {titleText}
          </Text>
          
          <View style={styles.dateRow}>
            <Feather name="calendar" size={12} color={colors.subText} />
            <Text style={[styles.cardDate, { color: colors.subText }]}>
              {item.displayDate}
            </Text>
            {/* Show time if available */}
            {item.time && (
              <>
                <View style={[styles.dot, { backgroundColor: colors.subText }]} />
                <Feather name="clock" size={12} color={colors.subText} />
                <Text style={[styles.cardDate, { color: colors.subText }]}>
                  {item.time}
                </Text>
              </>
            )}
          </View>
          
          <Text style={[styles.cardPreview, { color: colors.subText }]} numberOfLines={2}>
            {item.content}
          </Text>
        </TouchableOpacity>

        {/* Action Icons (Edit & Delete) */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.background }]}
            onPress={() => navigation.navigate('Write', { entry: item })}
          >
            <Feather name="edit-2" size={13} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: '#FEF2F2' }]} // Light red bg
            onPress={() => handleDelete(item.id)}
          >
            <Feather name="trash-2" size={13} color="#EF4444" />
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Your Journal History</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          Revisit your past thoughts and see how far you've come.
        </Text>

        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.subText }]}>
                No entries yet. Start writing today!
              </Text>
            </View>
          }
        />
        
        {/* Floating Action Button (FAB) */}
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.primary }]} 
          onPress={() => navigation.navigate('Write', { entry: undefined })}
        >
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Static Styles (Layout & Spacing only)
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  subtitle: { 
    fontSize: 14, 
    marginBottom: 20 
  },
  listContent: { 
    paddingBottom: 80 
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6 
  },
  dateRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 8 
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  cardDate: { 
    fontSize: 12 
  },
  cardPreview: { 
    fontSize: 14, 
    lineHeight: 20 
  },
  actionsContainer: {
    marginLeft: 10,
    gap: 12,
    alignItems: 'center',
  },
  iconButton: {
    padding: 3,
    borderRadius: 8,
  },
  emptyState: { 
    alignItems: 'center', 
    marginTop: 50 
  },
  emptyText: { 
    fontSize: 16 
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});