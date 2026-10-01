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
import {getGreeting} from '@/shared/greetings';

type Message = { id: string; text: string; from: 'user' | 'bot' };

export default function ChatScreen() {
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '0',
            text: `${getGreeting(new Date().getHours())}! How can I help?`,
            from: 'bot',
        },
    ]);

    function send() {
        const text = input.trim();
        if (!text) return;
        const id = Date.now().toString();
        setMessages((prev) => [
            ...prev,
            {id, text, from: 'user'},
            {id: id + 'b', text: `You said: ${text}`, from: 'bot'}, // placeholder reply
        ]);
        setInput('');
    }

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <FlatList
                        style={styles.flex}
                        data={messages}
                        keyExtractor={(m) => m.id}
                        contentContainerStyle={styles.list}
                        renderItem={({item}) => (
                            <ThemedView
                                type="backgroundElement"
                                style={[styles.bubble, item.from === 'user' ? styles.user : styles.bot]}>
                                <ThemedText>{item.text}</ThemedText>
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
                            onSubmitEditing={send}
                            placeholder="Message..."
                            placeholderTextColor={colors.text}
                            returnKeyType="send"
                        />
                        <Pressable onPress={send} style={styles.sendButton}>
                            <ThemedText>Send</ThemedText>
                        </Pressable>
                    </ThemedView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    container: {flex: 1},
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.three,
        paddingBottom: BottomTabInset,
    },
    list: {gap: 8, paddingVertical: Spacing.three},
    bubble: {padding: 12, borderRadius: 16, maxWidth: '80%'},
    user: {alignSelf: 'flex-end'},
    bot: {alignSelf: 'flex-start'},
    inputRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
    input: {flex: 1, padding: 12, borderRadius: 16},
    sendButton: {padding: 12},
});