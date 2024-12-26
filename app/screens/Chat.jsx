import { AuthContext } from '@/contexts/AuthProvider';
import { useChat } from '@/models/useChat';
import { BACKEND_URL } from '@/services/api-consumption';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { io } from 'socket.io-client';

const socket = io(`${BACKEND_URL}`.slice(0, -7));

export function Chat() {
  const { auth, token, connected } = useContext(AuthContext);
  const { handleChat } = useChat();
  const flatListRef = useRef();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendNewMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const { _id, coach_id, user_id } = auth;

    const messageInfo = {
      message: newMessage,
      transmitter: _id,
      receiver: coach_id._id,
      name: user_id.name,
      rol: 'cliente',
      client_id: _id,
      coach_id: coach_id._id,
      createdAt: Date.now(),
    };

    socket.emit('send', messageInfo);
    setMessages([...messages, messageInfo]);
    setNewMessage('');
  }, [newMessage]);

  useEffect(() => {
    auth &&
      (async () => {
        const client_id = auth._id;
        const coach_id = auth.coach_id._id;
        socket.emit('join', client_id);
        const response = await handleChat(token, client_id, coach_id);
        setMessages(response);
      })();

    socket.on('receive', (message) => {
      setMessages((state) => [...state, message]);
    });

    return () => socket.off('receive');
  }, [auth]);

  useEffect(() => {
    messages?.length > 0 && flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className="h-full">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="flex-row justify-center items-end h-24 pb-4 gap-x-2"
      >
        <Text className="text-2xl font-medium">Chatea con tu Entrenador</Text>
        <FontAwesome5 name="user-friends" size={20} color="black" />
      </LinearGradient>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' && 'padding'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => (
            <Message item={item} transmitter={auth?._id} />
          )}
        />

        <View className="flex-row border-t-2 bg-white">
          <TextInput
            multiline
            className="border-r-2 p-3 w-3/4"
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe tu mensaje..."
          />
          {connected ? (
            <TouchableOpacity
              onPress={sendNewMessage}
              style={{ width: '25%' }}
              className="flex-row justify-center items-center bg-[#82E5B5] gap-x-2"
            >
              <Text>Enviar</Text>
              <Ionicons name="send" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            <View
              style={{ width: '25%' }}
              className="justify-center items-center"
            >
              <Feather name="wifi-off" size={24} color="black" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Message({ item, transmitter }) {
  const dateMessage = new Date(item.createdAt);
  const mySelf = item.transmitter === transmitter;

  return (
    <View className={`${mySelf ? 'self-end' : 'self-start'} mt-2`}>
      <Text
        className={`font-bold ${mySelf ? 'self-end pr-2' : 'self-start pl-2'}`}
      >
        {item.name}
      </Text>
      <View
        className={`p-2 m-2 rounded-lg ${
          mySelf ? 'bg-[#82E5B5] self-end' : 'bg-white self-start'
        }`}
      >
        <Text className="text-base">{item.message}</Text>
      </View>
      <Text
        className={`${mySelf ? 'self-end pr-2' : 'self-start pl-2'} text-xs`}
      >
        {dateMessage.toLocaleDateString() +
          '   ' +
          dateMessage.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
      </Text>
    </View>
  );
}
