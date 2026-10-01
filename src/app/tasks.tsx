import {useState} from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {BottomTabInset, Colors, Spacing} from '@/constants/theme';
import {addTask, deleteTask, toggleTask} from '@/tasks/tasks';
import {Task} from '@/tasks/types';

export default function TasksScreen() {
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');

    function add() {
        setTasks((prev) => addTask(prev, input, Date.now().toString()));
        setInput('');
    }

    return (
        <ThemedView style={styles.flex}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <FlatList
                        style={styles.flex}
                        data={tasks}
                        keyExtractor={(t) => t.id}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={<ThemedText>No tasks yet.</ThemedText>}
                        renderItem={({item}) => (
                            <ThemedView type="backgroundElement" style={styles.row}>
                                <Pressable
                                    style={styles.flex}
                                    onPress={() => setTasks((prev) => toggleTask(prev, item.id))}>
                                    <ThemedText
                                        style={item.done ? styles.done : undefined}>
                                        {item.title}
                                    </ThemedText>
                                </Pressable>
                                <Pressable onPress={() => setTasks((prev) => deleteTask(prev, item.id))}>
                                    <ThemedText>✕</ThemedText>
                                </Pressable>
                            </ThemedView>
                        )}
                    />
                    <ThemedView style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.input,
                                {color: colors.text, backgroundColor: colors.backgroundElement},
                            ]}
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={add}
                            placeholder="New task..."
                            placeholderTextColor={colors.text}
                            returnKeyType="done"
                        />
                        <Pressable onPress={add} style={styles.addButton}>
                            <ThemedText>Add</ThemedText>
                        </Pressable>
                    </ThemedView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.three,
        paddingBottom: BottomTabInset,
    },
    list: {gap: 8, paddingVertical: Spacing.three},
    row: {flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16},
    done: {textDecorationLine: 'line-through', opacity: 0.5},
    inputRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    input: {flex: 1, padding: 12, borderRadius: 16},
    addButton: {padding: 12},
});