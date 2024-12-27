import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { AuthContext } from '@/contexts/AuthProvider';
import { useProfile } from '@/models/useProfile';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import Perfil from '../../assets/Perfil.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { capitalize } from '@/utils/utils';

export function UpdateProfile({ navigation }) {
  const { token, auth, setAuth } = useContext(AuthContext);
  const { loading, handleUpdateProfile } = useProfile();
  const [form, setForm] = useState({});

  const handleUpdateProfilePress = async () => {
    const response = await handleUpdateProfile(token, form);
    response
      ? Alert.alert('Éxito', 'Perfil actualizado con éxito', [
          {
            text: 'Aceptar',
            onPress: async () => {
              setAuth(form);
              await AsyncStorage.setItem('@profile', JSON.stringify(form));
              navigation.goBack();
            },
          },
        ])
      : Alert.alert('Error', 'No se pudo actualizar el perfil');
  };

  useEffect(() => {
    setForm(auth);
  }, [auth]);

  return (
    <KeyboardAvoidingView className="flex-1">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-52 items-center justify-end pb-2"
      >
        <Image
          source={Perfil}
          className="size-36 rounded-full bg-white"
          resizeMode="contain"
        />
      </LinearGradient>
      <ScrollView
        className="my-5 flex-1"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text className="text-center text-2xl font-bold">
          Actualización de perfil
        </Text>

        <FieldInput
          label="Nombre:"
          value={form?.user_id?.name}
          placeholder="Ingrese su nombre..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, name: value } })
          }
        />
        <FieldInput
          label="Apellido:"
          value={form?.user_id?.lastname}
          placeholder="Ingrese su apellido..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, lastname: value } })
          }
        />
        <FieldInput
          label="Correo:"
          value={form?.user_id?.email}
          placeholder="Ingrese su correo..."
          onChangeText={value =>
            setForm({ ...form, user_id: { ...form.user_id, email: value } })
          }
          editable={false}
        />
        <FieldSelect
          label="Genero:"
          selectedValue={form?.genre}
          onValueChange={value => setForm({ ...form, genre: value })}
          values={['masculino', 'femenino']}
        />
        <FieldInput
          label="Peso (en kg):"
          value={form?.weight?.toString()}
          placeholder="Ingrese su peso..."
          onChangeText={value => setForm({ ...form, weight: value })}
          keyboardType="numeric"
        />
        <FieldInput
          label="Altura (en cm):"
          value={form?.height?.toString()}
          placeholder="Ingrese su altura..."
          onChangeText={value => setForm({ ...form, height: value })}
          keyboardType="numeric"
        />
        <FieldInput
          label="Edad:"
          value={form?.age?.toString()}
          placeholder="Ingrese su edad..."
          onChangeText={value => setForm({ ...form, age: value })}
          keyboardType="numeric"
        />
        <FieldSelect
          label="Nivel de actividad:"
          selectedValue={form?.levelactivity}
          onValueChange={value => setForm({ ...form, levelactivity: value })}
          values={['principiante', 'intermedio', 'avanzado']}
        />
        <FieldInput
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
          className="w-3/4 flex-row items-center justify-center gap-x-2 rounded-xl bg-primary p-2"
          onPress={() => handleUpdateProfilePress()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text className="font-bold">Guardar</Text>
              <Entypo name="save" size={20} color="black" />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2 w-3/4 flex-row items-center justify-center gap-x-2 rounded-xl bg-primary p-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="font-bold">Cancelar</Text>
          <MaterialIcons name="close" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldInput({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  editable = true,
  keyboardType = 'default',
}) {
  return (
    <View className="my-2 w-3/4 flex-col">
      <View className="flex-row items-center gap-x-2">
        <AntDesign name="edit" size={16} color="black" />
        <Text className="font-bold">{label}</Text>
      </View>
      <TextInput
        className="border-b-2 border-b-primary text-center text-lg"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );
}

function FieldSelect({ label, selectedValue, onValueChange, values }) {
  return (
    <View className="my-2 w-3/4 flex-col">
      <View className="flex-row items-center gap-x-2">
        <AntDesign name="edit" size={16} color="black" />
        <Text className="font-bold">{label}</Text>
      </View>
      <View className="border-b-2 border-b-primary">
        <Picker
          dropdownIconColor="#82E5B5"
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {values?.map(value => (
            <Picker.Item key={value} label={capitalize(value)} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
