import { AuthContext } from '@/contexts/AuthProvider';
import { useChat } from '@/models/useChat';
import { BACKEND_URL } from '@/services/api-consumption';
import { formatDateToEC } from '@/utils/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
      message: newMessage.trim(),
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

  const renderMessage = useCallback(
    ({ item, index }) => {
      const mySelf = item.transmitter === auth?._id;
      const again = messages[index - 1]?.transmitter !== item.transmitter;
      const date = new Date(item.createdAt);

      const isDifferentDay =
        date.toLocaleDateString() !==
        new Date(messages[index - 1]?.createdAt).toLocaleDateString();

      const formattedDate = formatDateToEC(date);

      return (
        <>
          {isDifferentDay && (
            <Text className="my-4 p-1 text-center">{formattedDate}</Text>
          )}
          <Message
            index={index}
            item={item}
            mySelf={mySelf}
            again={again}
            isDifferentDay={isDifferentDay}
          />
        </>
      );
    },
    [messages, auth],
  );

  useEffect(() => {
    auth &&
      (async () => {
        const client_id = auth._id;
        const coach_id = auth.coach_id._id;
        socket.emit('join', client_id);
        const response = await handleChat(token, client_id, coach_id);
        response && setMessages(response);
      })();

    socket.on('receive', message => {
      setMessages(state => [...state, message]);
    });

    return () => socket.off('receive');
  }, [token]);

  useEffect(() => {
    messages && flatListRef?.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className="h-full">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-24 flex-row items-end justify-center gap-x-2 pb-4"
      >
        <Text className="text-2xl font-medium">Chatea con tu Entrenador</Text>
        <MaterialCommunityIcons
          name="account-supervisor"
          size={20}
          color="black"
        />
      </LinearGradient>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' && 'padding'}
      >
        {messages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index}
            renderItem={renderMessage}
          />
        ) : (
          <View className="flex-1" />
        )}

        <View className="flex-row border-t-2 bg-white">
          <TextInput
            multiline
            className="w-3/4 border-r-2 p-3"
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Escribe tu mensaje..."
          />
          {connected ? (
            <TouchableOpacity
              onPress={sendNewMessage}
              className="w-1/4 flex-row items-center justify-center gap-x-2 bg-primary"
            >
              <Text>Enviar</Text>
              <MaterialCommunityIcons name="send" size={16} color="black" />
            </TouchableOpacity>
          ) : (
            <View className="w-1/4 items-center justify-center">
              <MaterialCommunityIcons name="wifi-off" size={24} color="black" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Message({ item, mySelf, again, isDifferentDay }) {
  const { name, message, createdAt } = item;

  return (
    <View className={mySelf ? 'self-end' : 'self-start'}>
      {(again || isDifferentDay) && (
        <Text
          className={`mt-1 font-bold ${
            mySelf ? 'self-end pr-2' : 'self-start pl-2'
          }`}
        >
          {name}
        </Text>
      )}
      <View
        className={`relative mb-1 min-w-10 rounded-lg pb-4 pl-2 pt-2 ${
          mySelf
            ? 'mr-3 self-end bg-primary pr-2'
            : 'ml-3 self-start bg-white pr-9'
        }`}
      >
        <Text className="absolute bottom-0.5 right-1.5 text-xs">
          {new Date(createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text className={mySelf ? 'self-end' : 'self-start'}>{message}</Text>
      </View>
    </View>
  );
}
