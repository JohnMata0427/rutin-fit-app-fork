import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRegister } from '@/models/useRegister';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { orderOfDays } from '@/utils/utils';
import { View, Text, ScrollView, Image } from 'react-native';
import { AuthHeader } from '@/components/AuthHeader';
import RegistroIcon from '../../assets/RegistroIcon.png'

export function Datos({ navigation }) {
  const insets = useSafeAreaInsets();
  const { token } = useContext(AuthContext);
  const { handleRegisterInitialData, loading, modalVisible, setModalVisible } =
    useRegister();

  const [form, setForm] = useState({});

  const handleSelectDay = day => {
    setForm(({ days }) => {
      const newDays = days?.includes(day)
        ? days.filter(d => d !== day)
        : [...days, day];

      return { ...form, days: newDays };
    });
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <AuthHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
					<Image
						source={RegistroIcon}
						className="w-36 h-36"
            resizeMode='contain'
					/>
					<Text className="text-2xl font-bold text-center">
						Datos Iniciales
					</Text>

					<View
						className="flex-row gap-x-5 justify-center"
					>
						<View className="w-1/2">
							<Text className="font-bold">Altura(cm):</Text>
							<TextInput
								className="border-b-2"
								placeholder="Ingrese su altura..."
								keyboardType="numeric"
								onChangeText={value => setForm({ ...form, height: value })}
							/>
						</View>
						<View className="w-1/2">
							<Text className="font-bold">Peso(kg):</Text>
							<TextInput
								className="border-b-2"
								placeholder="Ingrese su peso..."
								keyboardType="numeric"
								onChangeText={value => setForm({ ...form, weight: value })}
							/>
						</View>
					</View>

					<View className="flex-col w-full gap-y-5" style={{ maxWidth: "90%" }}>
						<Text className="text-lg font-bold text-center">
							Nivel de actividad física:
						</Text>
						<View className="border-b-2">
							<Picker>
                <Picker.Item label="Principiante" value="principiante"/>
                
              </Picker>
						</View>
						<Text className="font-bold"> Edad: </Text>
						<TextInput
							keyboardType="numeric"
							className=" border-b-2"
							placeholder="Ingrese su edad"
							onChangeText={value => setForm({ ...form, age: value })}
						/>
						<Text className="font-bold">Genero:</Text>
						<View className="border-b-2 max-w-full">
							<RNPickerSelect
								onValueChange={value => setForm({ ...form, genre: value })}
								items={[
									{ label: "Masculino", value: "masculino" },
									{ label: "Femenino", value: "femenino" },
								]}
								placeholder={{ label: "Seleccione un genero", value: null }}
							/>
						</View>
						<Text className="font-bold text-center">
							{" "}
							Días disponibles para hacer ejercicio:{" "}
						</Text>
						<View className=" gap-y-2 flex-row flex-wrap">
							{dias.map((dia, index) => (
								<View key={index} className="flex-row mx-3">
									<TouchableOpacity
										style={[
											{
												width: 20,
												height: 20,
												borderWidth: 2,
												borderColor: "#000",
												marginRight: 10,
											},
											datos.days.includes(dia)
												? { backgroundColor: "#82E5B5" }
												: { backgroundColor: "#fff" },
										]}
										onPress={() => seleccionDia(dia)}
									/>
									<Text>{dia}</Text>
								</View>
							))}
						</View>
						<Text className="font-bold text-center">
							Entrenadores disponibles:
						</Text>
						<TouchableOpacity
							className="bg-[#82E5B5] rounded-xl p-2"
							onPress={() => setModalVisible(true)}
						>
							<Text className="text-center"> Ver entrenadores </Text>
						</TouchableOpacity>
						<Text> Entreandor seleccionado: {datos.nombre_coach} </Text>
						<ModalEntrenadores
							visible={modalVisible}
							close={() => setModalVisible(false)}
							token={datos.token}
							datos={datos}
							setForm={setForm}
						/>
					</View>
					<Pressable
						onPress={() => {
							validacionesDatos();
						}}
						disabled={loading}
						style={{
							backgroundColor: "#82E5B5",
							padding: 10,
							borderRadius: 5,
						}}
					>
						{loading ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text className="">Aceptar</Text>
						)}
					</Pressable>
      </ScrollView>
    </View>
  );
}
