import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { AuthContext } from '@/contexts/AuthProvider';
import { useProfile } from '@/models/useProfile';
import PerfilFemenino from '@assets/perfilFemenino.webp';
import PerfilMasculino from '@assets/perfilMasculino.webp';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function UpdateProfile({ navigation }) {
  const { token, auth, setAuth } = useContext(AuthContext);
  const { loading, handleUpdateProfile } = useProfile();
  const [form, setForm] = useState({});

  const handleUpdateProfilePress = async () => {
    const response = await handleUpdateProfile(token, form);

    Alert.alert(
      'Mensaje del sistema',
      response
        ? 'Perfil actualizado con éxito'
        : 'No se pudo actualizar el perfil, intente nuevamente más tarde',
    );

    if (response) {
      setAuth(form);
      await AsyncStorage.setItem('@profile', JSON.stringify(form));
      navigation.goBack();
    }
  };

  useEffect(() => {
    setForm(auth);
  }, [auth]);

  return (
    <ScrollView className="flex-1">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-52 items-center justify-end pb-2"
      >
        <Image
          source={
            form?.genre === 'masculino' ? PerfilMasculino : PerfilFemenino
          }
          className="size-36 rounded-full bg-white"
          resizeMode="contain"
        />
      </LinearGradient>
      <View className="mx-auto my-5 w-4/5 flex-1 gap-y-3">
        <Text className="text-center text-2xl font-bold">
          Actualización de perfil
        </Text>

        <InputField
          label="Nombre:"
          value={form?.user_id?.name}
          placeholder="Ingrese su nombre..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, name: value } })
          }
        />
        <InputField
          label="Apellido:"
          value={form?.user_id?.lastname}
          placeholder="Ingrese su apellido..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, lastname: value } })
          }
        />
        <InputField
          label="Correo:"
          value={form?.user_id?.email}
          placeholder="Ingrese su correo..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, email: value } })
          }
          editable={false}
        />
        <SelectField
          label="Genero:"
          selectedValue={form?.genre}
          onValueChange={value => setForm({ ...form, genre: value })}
          values={['masculino', 'femenino']}
        />
        <InputField
          label="Peso (en kg):"
          value={form?.weight?.toString()}
          placeholder="Ingrese su peso..."
          onChangeText={value => setForm({ ...form, weight: value })}
          keyboardType="numeric"
        />
        <InputField
          label="Altura (en cm):"
          value={form?.height?.toString()}
          placeholder="Ingrese su altura..."
          onChangeText={value => setForm({ ...form, height: value })}
          keyboardType="numeric"
        />
        <InputField
          label="Edad:"
          value={form?.age?.toString()}
          placeholder="Ingrese su edad..."
          onChangeText={value => setForm({ ...form, age: value })}
          keyboardType="numeric"
        />
        <SelectField
          label="Nivel de actividad:"
          selectedValue={form?.levelactivity}
          onValueChange={value => setForm({ ...form, levelactivity: value })}
          values={['principiante', 'intermedio', 'avanzado']}
        />
        <InputField
          multiline
          label="Días de entrenamiento:"
          value={form?.days?.join(', ')}
          placeholder="Ingrese sus días disponibles para entrenar..."
          onChangeText={value =>
            setForm({
              ...form,
              days: value.split(',').map(day => day.trim()),
            })
          }
        />

        <TouchableOpacity
          className="flex-row items-center justify-center gap-x-2 rounded-xl bg-primary p-2"
          onPress={() => handleUpdateProfilePress()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text className="font-bold">Guardar</Text>
              <MaterialCommunityIcons
                name="content-save"
                size={20}
                color="black"
              />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center gap-x-2 rounded-xl bg-primary p-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="font-bold">Cancelar</Text>
          <MaterialCommunityIcons name="close-circle" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
