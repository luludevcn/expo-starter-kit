import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Spacer, TimerDisplay } from '../src/components';
import { useTimer } from '../src/hooks';

export default function HomeScreen() {
    const timer = useTimer({ initialSeconds: 30 });

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
            <ScrollView>
                <View className="p-4">
                    <Text className="text-3xl font-bold text-gray-900 text-center">Expo Starter Kit</Text>
                    <Text className="text-lg text-gray-500 text-center">Your reusable app template</Text>

                    <Spacer size="xl" />

                    <Card>
                        <Text className="text-xl font-semibold text-gray-900">Timer Demo</Text>
                        <Spacer size="md" />
                        <View className="items-center py-6">
                            <TimerDisplay seconds={timer.remainingSeconds} isRunning={timer.isRunning} size="large" />
                        </View>
                        <Spacer size="md" />
                        <View className="flex-row justify-center">
                            <Button
                                title={timer.isRunning ? 'Pause' : 'Start'}
                                onPress={timer.isRunning ? timer.pause : timer.start}
                                variant="primary"
                                size="medium"
                            />
                            <Spacer direction="horizontal" size="sm" />
                            <Button title="Reset" onPress={() => timer.reset()} variant="outline" size="medium" />
                        </View>
                    </Card>

                    <Spacer size="lg" />

                    <Card>
                        <Text className="text-xl font-semibold text-gray-900">Navigation</Text>
                        <Spacer size="md" />
                        <Link href="/settings" asChild>
                            <Button title="Go to Settings" variant="secondary" fullWidth />
                        </Link>
                        <Spacer size="sm" />
                        <Link href="/history" asChild>
                            <Button title="View History" variant="outline" fullWidth />
                        </Link>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
