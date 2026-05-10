import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHistoryStore } from '../src/stores';
import { Card, Spacer, Button } from '../src/components';
import { formatDateTime } from '../src/utils/helpers';
import type { HistoryItem } from '../src/types';

export default function HistoryScreen() {
  const { items, removeItem, clearHistory } = useHistoryStore();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeItem(id),
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('Clear History', 'Are you sure you want to clear all history?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: clearHistory,
      },
    ]);
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Card>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-medium text-gray-900 flex-1">{item.title}</Text>
        <Button title="Delete" variant="ghost" size="small" onPress={() => handleDelete(item.id)} />
      </View>
      {item.description && <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>}
      <Text className="text-xs text-gray-400 mt-2">{formatDateTime(item.createdAt)}</Text>
    </Card>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-16">
      <Text className="text-lg font-medium text-gray-500">No history yet</Text>
      <Text className="text-sm text-gray-400 mt-1">Your activity will appear here</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {items.length > 0 && (
        <View className="px-4 py-2 items-end">
          <Button title="Clear All" variant="outline" size="small" onPress={handleClearAll} />
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerClassName="p-4 flex-grow"
        ItemSeparatorComponent={() => <Spacer size="sm" />}
      />
    </SafeAreaView>
  );
}
