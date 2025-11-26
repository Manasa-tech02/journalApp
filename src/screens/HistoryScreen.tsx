import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import  CustomHeader from '../components/CustomHeader';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { JournalEntry } from '../redux/journalSlice';

export const HistoryScreen = () => {
  const entries = useSelector((state: RootState) => state.journal.entries);
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Write', { entry: item })}
    >
      <View style={{flex: 1}}>
        <Text style={styles.cardTitle}>{item.content.substring(0, 30)}...</Text>
        <View style={styles.dateRow}>
          <Feather name="calendar" size={12} color={colors.subText} />
          <Text style={styles.cardDate}>{item.displayDate}</Text>
        </View>
        <Text style={styles.cardPreview} numberOfLines={2}>{item.content}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.subText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Your Journal History</Text>
        <Text style={styles.subtitle}>Revisit your past thoughts and see how far you've come.</Text>

        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No entries yet. Start writing today!</Text>
            </View>
          }
        />
        
        {/* Floating Action Button (FAB) */}
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => navigation.navigate('Write', { entry: undefined })}
        >
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.subText, marginBottom: 20 },
  listContent: { paddingBottom: 80 },
  card: {
    backgroundColor: colors.cardBg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  cardDate: { fontSize: 12, color: colors.subText },
  cardPreview: { fontSize: 14, color: colors.subText, lineHeight: 20 },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: colors.subText, fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
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





// import React from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import { Feather } from '@expo/vector-icons';
// import { colors } from '../theme/colors';
// import { CustomHeader } from '../components/CustomHeader';
// import { RootState } from '../redux/store';
// import { useNavigation } from '@react-navigation/native';
// import { JournalEntry, deleteEntry } from '../redux/journalSlice'; // Import deleteEntry action

// export const HistoryScreen = () => {
//   const entries = useSelector((state: RootState) => state.journal.entries);
//   const navigation = useNavigation<any>();
//   const dispatch = useDispatch();

//   // Handler for deleting an entry with confirmation
//   const handleDelete = (id: string) => {
//     Alert.alert(
//       'Confirm Deletion',
//       'Are you sure you want to delete this journal entry? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             dispatch(deleteEntry(id));
//           },
//         },
//       ]
//     );
//   };

//   const renderItem = ({ item }: { item: JournalEntry }) => (
//     <View style={styles.card}>
//       {/* Content Area - Tapping this area still allows quick navigation to edit/view */}
//       <TouchableOpacity 
//         style={styles.contentArea}
//         onPress={() => navigation.navigate('Write', { entry: item })}
//       >
//         <Text style={styles.cardTitle} numberOfLines={1}>
//           {item.content.split('\n')[0] || 'Untitled Entry'}
//         </Text>
//         <View style={styles.dateRow}>
//           <Feather name="calendar" size={12} color={colors.subText} />
//           <Text style={styles.cardDate}>{item.displayDate}</Text>
//           <Feather name="clock" size={12} color={colors.subText} style={{marginLeft: 8}} />
//           <Text style={styles.cardDate}>{item.time}</Text>
//         </View>
//         <Text style={styles.cardPreview} numberOfLines={1}>{item.content}</Text>
//       </TouchableOpacity>
      
//       {/* Actions (Icons) */}
//       <View style={styles.actionContainer}>
//         {/* EDIT ICON: Navigates to WriteScreen */}
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.editButton]}
//           onPress={() => navigation.navigate('Write', { entry: item })}
//         >
//           <Feather name="edit-3" size={18} color={colors.primary} />
//         </TouchableOpacity>

//         {/* DELETE ICON: Triggers confirmation and deletion */}
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.deleteButton]}
//           onPress={() => handleDelete(item.id)}
//         >
//           <Feather name="trash-2" size={18} color={colors.danger} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <CustomHeader />
//       <View style={styles.container}>
//         <Text style={styles.title}>Your Journal History</Text>
//         <Text style={styles.subtitle}>Revisit your past thoughts and see how far you've come.</Text>

//         <FlatList
//           data={entries}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.listContent}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyText}>No entries yet. Start writing today!</Text>
//             </View>
//           }
//         />
        
//         {/* Floating Action Button (FAB) */}
//         <TouchableOpacity 
//           style={styles.fab} 
//           onPress={() => navigation.navigate('Write', { entry: undefined })}
//         >
//           <Feather name="plus" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: colors.background },
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
//   subtitle: { fontSize: 14, color: colors.subText, marginBottom: 20 },
//   listContent: { paddingBottom: 80 },
//   card: {
//     backgroundColor: colors.cardBg,
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   contentArea: { 
//     flex: 1, 
//     marginRight: 10,
//     paddingRight: 5,
//   },
//   cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
//   dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
//   cardDate: { fontSize: 12, color: colors.subText },
//   cardPreview: { fontSize: 14, color: colors.subText, lineHeight: 20 },
//   actionContainer: {
//     flexDirection: 'column',
//     gap: 8,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//   },
//   actionButton: {
//     padding: 2,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.inputBg,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   editButton: {},
//   deleteButton: {},
//   emptyState: { alignItems: 'center', marginTop: 50 },
//   emptyText: { color: colors.subText, fontSize: 16 },
//   fab: {
//     position: 'absolute',
//     bottom: 30,
//     right: 20,
//     backgroundColor: colors.primary,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//   },
// });




