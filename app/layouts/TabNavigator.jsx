import { Chat } from '@/screens/Chat';
import { Home } from '@/screens/Home';
import { Profile } from '@/screens/Profile';
import { Routines } from '@/screens/Routines';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon =
            name === 'Home'
              ? 'home'
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Rutinas" component={Routines} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
