import { AuthHeader } from '@/components/AuthHeader';
import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { CoachsModal } from '@/components/modals/CoachsModal';
import { AuthContext } from '@/contexts/AuthProvider';
import { useRegister } from '@/models/useRegister';
import { orderOfDays } from '@/utils/utils';
import RegistroIcon from '@assets/RegistroIcon.png';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function ClientData({ navigation }) {
  const { token, setAuth } = useContext(AuthContext);
  const {
    handleRegisterInitialData,
    loading,
    modalVisible,
    setModalVisible,
    messages,
  } = useRegister();

  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    days: [],
    coach_name: '',
    levelactivity: 'principiante',
    genre: 'masculino',
  });

  const handleSelectDay = day => {
    setForm(({ days }) => {
      const newDays = days?.includes(day)
        ? days.filter(d => d !== day)
        : [...days, day];

      return { ...form, days: newDays };
    });
  };

  const handleRegisterInitialDataPress = async () => {
    const response = await handleRegisterInitialData(token, form);
    setAuth(response);

    response && navigation.navigate('Main');
    messages && Alert.alert('Mensaje del sistema', messages[0]);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexGrow: 1,
      }}
    >
      <AuthHeader />
      <Image
        source={RegistroIcon}
        className="mx-auto size-28"
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-bold">Datos Iniciales</Text>

      <View className="mx-auto mb-5 w-4/5 flex-col items-center gap-y-5">
        <View className="flex-row gap-x-5">
          <View className="w-1/2">
            <InputField
              label="Altura (en cm):"
              placeholder="Ingrese su altura..."
              value={form.height}
              iconName="human-male-height"
              onChangeText={value => setForm({ ...form, height: value })}
              keyboardType="numeric"
            />
          </View>

          <View className="w-1/2">
            <InputField
              label="Peso (en kg):"
              placeholder="Ingrese su peso..."
              value={form.weight}
              iconName="weight-kilogram"
              onChangeText={value => setForm({ ...form, weight: value })}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="flex-row items-end gap-x-5">
          <View className="w-1/2">
            <InputField
              label="Edad:"
              placeholder="Ingrese su edad..."
              value={form.age}
              iconName="timer-settings"
              onChangeText={value => setForm({ ...form, age: value })}
              keyboardType="numeric"
            />
          </View>

          <View className="w-1/2">
            <SelectField
              label="Género:"
              selectedValue={form.genre}
              iconName={
                form.genre === 'masculino' ? 'gender-male' : 'gender-female'
              }
              values={['masculino', 'femenino']}
              onValueChange={value => setForm({ ...form, genre: value })}
            />
          </View>
        </View>
        <View>
          <SelectField
            label="Nivel de actividad física:"
            selectedValue={form.levelactivity}
            values={['principiante', 'intermedio', 'avanzado']}
            onValueChange={value => setForm({ ...form, levelactivity: value })}
            iconName={
              form.levelactivity === 'principiante'
                ? 'battery-charging-20'
                : form.levelactivity === 'intermedio'
                  ? 'battery-charging-50'
                  : 'battery-charging-100'
            }
          />
        </View>

        <Text className="text-center font-bold">
          Días disponibles para hacer ejercicio:
        </Text>
        <View className="flex-row flex-wrap justify-center gap-4">
          {orderOfDays.map(day => (
            <View key={day} className="flex-row gap-x-2">
              <TouchableOpacity
                className={`size-5 border-2 ${form?.days?.includes(day) ? 'bg-primary' : 'bg-white'}`}
                onPress={() => handleSelectDay(day)}
              />
              <Text>{day}</Text>
            </View>
          ))}
        </View>

        <Text className="text-center font-bold">Entrenadores disponibles:</Text>
        <TouchableOpacity
          className="mx-auto rounded-lg bg-primary p-2"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-center"> Ver entrenadores </Text>
        </TouchableOpacity>
        <Text> Entreandor seleccionado: {form.coach_name} </Text>
        <CoachsModal
          visible={modalVisible}
          onPress={() => setModalVisible(false)}
          form={form}
          setForm={setForm}
        />

        <Pressable
          onPress={handleRegisterInitialDataPress}
          disabled={loading}
          className="rounded-lg bg-primary p-2"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-center">Aceptar</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
