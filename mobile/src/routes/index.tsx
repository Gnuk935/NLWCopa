import {NavigationContainer} from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import {SingIn} from '../screens/SingIn'

export function Routes(){
    return(
        <NavigationContainer>
            <SingIn/>
        </NavigationContainer>
    )
}