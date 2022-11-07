import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PlusCircle, SoccerBall} from 'phosphor-react-native'
import {useTheme} from 'native-base'
import {Platform} from 'react-native'

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    const {colors, sizes} = useTheme();

    const size = sizes[6];

    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',

            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],

            tabBarStyle:{
                position: 'absolute',
                height: 87,
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },

            tabBarItemStyle:{
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>
            <Screen
                //Estilização
                options={{
                    tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>,
                    tabBarLabel: 'Novo bolão'
                }}
                //fim

                name='new' //rota
                component={New} //Oq deve ser renderizado nessa rota
            />

            <Screen
                //Estilização
                options={{
                    tabBarIcon: ({color}) => <SoccerBall color={color} size={size}/>,
                    tabBarLabel: 'Meus bolões'
                }}
                //fim

                name='pools' //rota
                component={Pools} //Oq deve ser renderizado nessa rota
            />

            <Screen
                //Estilização
                options={{
                    tabBarButton: () => null, //oculta o menu
                }}
                //fim

                name='find' //rota
                component={Find} //Oq deve ser renderizado nessa rota
            />

        </Navigator>
    )
}