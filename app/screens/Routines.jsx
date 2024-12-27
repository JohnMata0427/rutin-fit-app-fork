import { AuthContext } from '@/contexts/AuthProvider';
import { useCompletedDays } from '@/models/useCompletedDays';
import { useProgress } from '@/models/useProgress';
import { useRoutines } from '@/models/useRoutines';
import { FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { formatDateToEC, capitalize, orderOfDays } from '@/utils/utils';
import { List } from 'react-native-paper';
import { Image } from 'react-native';

export function Routines() {
  const { token, connected } = useContext(AuthContext);

  const { handleRoutines } = useRoutines();
  const { loadingProgress, handleProgress } = useProgress();
  const { loading, handleCheckDay } = useCompletedDays();

  const [routines, setRoutines] = useState([]);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [progress, setProgress] = useState({
    currentWeek: 0,
    observations: '',
  });

  const Field = useCallback(
    ({ name, value }) => (
      <>
        <Text className="text-lg font-bold">{name}</Text>
        <Text>{'• ' + capitalize(value)}</Text>
      </>
    ),
    [],
  );

  const handleCheckDayPress = async day => {
    const response = await handleCheckDay(token, day);
    Alert.alert(
      response
        ? 'Felicidades por completar un día de entrenamiento'
        : 'Hubo un error en el sistema, o el día que intentas marcar no coincide con el día de entrenamiento actual',
    );
  };

  const handleProgressPress = async () => {
    const response = await handleProgress(token, progress);
    setProgress({ currentWeek: 0, observations: '' });
    Alert.alert(response);
  };

  useEffect(() => {
    (async () => {
      let getRoutines = [];
      try {
        getRoutines = connected && (await handleRoutines(token));
        console.log("getRoutines 1",getRoutines[0]?._id)
        await AsyncStorage.setItem('@routines', JSON.stringify(routines));
      } catch {
        const savedRoutines = await AsyncStorage.getItem('@routines');
        console.log("savedRoutines", JSON.parse(savedRoutines)[0]?._id)
        getRoutines = JSON.parse(savedRoutines);
      } finally {
        setLoadingRefresh(false);
      }

      setRoutines(getRoutines);
    })();
  }, [token, refresh]);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#82E5B5', '#4DAF6F']}
        className="h-24 flex-row items-end justify-center gap-x-2 pb-4"
      >
        <Text className="text-center text-2xl font-medium">
          Rutinas Asignadas
        </Text>
        <AntDesign name="switcher" size={20} color="black" />
      </LinearGradient>
      {routines?.length === 0 ? (
        <View className="items-center p-10">
          <FontAwesome5 name="sad-tear" size={24} color="black" />
          <Text className="text-2xl font-bold">No hay rutinas disponibles</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 p-2"
          refreshControl={
            <RefreshControl
              refreshing={loadingRefresh}
              onRefresh={() => {
                setLoadingRefresh(true);
                setRefresh(!refresh);
              }}
            />
          }
        >
          {routines?.map(
            ({ nameRoutine, days, comments, start_date, end_date }, index) => (
              <List.Accordion
                key={index}
                title={nameRoutine}
                left={props => <List.Icon {...props} icon="calendar-today" />}
                style={{
                  backgroundColor: '#f9f9f9',
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                theme={{
                  colors: { primary: '#4DAF6F', primaryContainer: '#4DAF6F' },
                }}
              >
                <View className="gap-y-3 p-3">
                  <Text className="text-lg font-bold">Días asignados: </Text>
                  {days
                    .sort(
                      (a, b) =>
                        orderOfDays.indexOf(a.day) - orderOfDays.indexOf(b.day),
                    )
                    .map(({ day, exercises }) => (
                      <List.Accordion
                        key={day}
                        title={capitalize(day)}
                        left={props => (
                          <List.Icon {...props} icon="calendar-today" />
                        )}
                        style={{
                          backgroundColor: '#f9f9f9',
                          marginBottom: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                        }}
                      >
                        {exercises.map(
                          ({
                            _id,
                            name,
                            bodyPart,
                            equipment,
                            target,
                            secondaryMuscles,
                            instructions,
                            gifUrl,
                          }) => (
                            <View key={_id} className="border-b p-3">
                              <Field name="Ejercicio:" value={name} />
                              <Field
                                name="Zona del cuerpo enfocada:"
                                value={bodyPart ?? 'No especificada'}
                              />
                              <Field
                                name="Equipo especial:"
                                value={equipment ?? 'No se necesita'}
                              />
                              <Field
                                name="Parte del cuerpo enfocada:"
                                value={target ?? 'No especificada'}
                              />
                              <Field
                                name="Musculos secundarios:"
                                value={
                                  secondaryMuscles?.join(', ') ??
                                  'No especificada'
                                }
                              />
                              <Field
                                name="Instrucciones:"
                                value={
                                  instructions?.join('\n • ') ??
                                  'No especificadas'
                                }
                              />
                              {gifUrl ? (
                                <Image
                                  source={{ uri: gifUrl }}
                                  resizeMode="cover"
                                  className="m-2 h-52 rounded-xl"
                                ></Image>
                              ) : (
                                <Text className="text-red-500">
                                  No hay imagenes de muestra
                                </Text>
                              )}
                              <TouchableOpacity
                                className="flex-row items-center justify-center gap-x-2 rounded-xl border-black bg-primary p-2"
                                onPress={() => handleCheckDayPress(day)}
                              >
                                {loading ? (
                                  <ActivityIndicator
                                    color="#fff"
                                    size="small"
                                  />
                                ) : (
                                  <>
                                    <Text className="font-bold">
                                      Marcar como completado
                                    </Text>
                                    <AntDesign
                                      name="checkcircle"
                                      size={16}
                                      color="black"
                                    />
                                  </>
                                )}
                              </TouchableOpacity>
                            </View>
                          ),
                        )}
                      </List.Accordion>
                    ))}
                  <View className="my-2 gap-x-2 rounded-lg border p-3">
                    <Field name="Comentarios:" value={comments} />
                  </View>
                  <View className="my-2 gap-x-2 rounded-lg border p-3">
                    <Field
                      name="Fecha de inicio:"
                      value={formatDateToEC(new Date(start_date))}
                    />
                  </View>
                  <View className="my-2 gap-x-2 rounded-lg border p-3">
                    <Field
                      name="Fecha de fin:"
                      value={formatDateToEC(new Date(end_date))}
                    />
                  </View>
                </View>
              </List.Accordion>
            ),
          )}
          <View className="my-2 rounded-xl border p-3">
            <Text className="text-xl font-bold">
              ¿Has sentido algún progreso?
            </Text>
            <Text className="my-2 text-primary">
              Por favor recuerda que los cambios deben ser respetuosos y
              constructivos, además, los cambios ingresados afectarán a su
              perfil, por ende, asegúrese de que los cambios sean correctos.
            </Text>
            <Text>Puedes agregar tus cambios aquí:</Text>
            <TextInput
              placeholder="Ingresa tu nuevo peso...."
              className="border-b-2 border-primary p-2"
              value={progress.currentWeight}
              keyboardType="numeric"
              onChangeText={value =>
                setProgress({ ...progress, currentWeight: value })
              }
            />
            <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder="Escribe aquí tus cambios...."
              className="border-b-2 border-primary p-2"
              value={progress.observations}
              onChangeText={value =>
                setProgress({ ...progress, observations: value })
              }
            />
            <TouchableOpacity
              className="mt-4 flex-row items-center justify-center gap-x-2 rounded-md bg-primary p-2"
              onPress={() => handleProgressPress()}
              disabled={loadingProgress}
            >
              {loadingProgress ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Text className="font-bold">Guardar</Text>
                  <Entypo name="save" size={20} color="black" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
