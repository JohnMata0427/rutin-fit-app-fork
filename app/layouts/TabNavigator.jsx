import { Chat } from '@/screens/Chat';
import { Profile } from '@/screens/Profile';
import { Progress } from '@/screens/Progress';
import { Routines } from '@/screens/Routines';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Rutinas"
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon =
            name === 'Progreso'
              ? 'barbell'
              : name === 'Perfil'
                ? 'person'
                : name === 'Chat'
                  ? 'chatbox-ellipses'
                  : 'fitness';

          const iconFullName = focused ? icon : `${icon}-outline`;

          return <Ionicons name={iconFullName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#82E5B5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Rutinas" component={Routines} />
      <Tab.Screen name="Progreso" component={Progress} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
