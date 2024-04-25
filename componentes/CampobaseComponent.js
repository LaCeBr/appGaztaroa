import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import Identidad from './IdentidadComponent';
import { Platform } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador() {
    return (
        <Stack.Navigator
            initialRouteName= "Calendar"
            headerMode = "float"
            screenOptions = {{
                headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="Calendar"
                component = { Calendario }
                options = {{
                    title: 'Calendario Gaztaroa',
                }}
            />
            <Stack.Screen
                name = "DetalleExcursion"
                component = { DetalleExcursion }
                options = {{
                    title: 'Detalle Excursión',
                }}
            />
        </Stack.Navigator>
    );
}

function HomeNavegador(){
    return(
        <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: '#015afc' }, 
            headerTitleStyle: { color: '#fff' }
        }}> 
            <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Campo Base', }} 
            /> 
        </Stack.Navigator>
    );
}

function IdentidadNavegador(){
    return(
        <Stack.Navigator 
        initialRouteName="Identidad" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: '#015afc' }, 
            headerTitleStyle: { color: '#fff' }
        }}> 
            <Stack.Screen 
            name="Identidad" 
            component={Identidad} 
            options={{ title: 'Quiénes somos', }} 
            /> 
        </Stack.Navigator>
    );
}

function ContactoNavegador(){
    return(
        <Stack.Navigator 
        initialRouteName="Contacto" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: '#015afc' }, 
            headerTitleStyle: { color: '#fff' }
        }}> 
            <Stack.Screen 
            name="Contacto" 
            component={Contacto} 
            options={{ title: 'Contactanos', }} 
            /> 
        </Stack.Navigator>
    );
}

function DrawerNavegador() { 
    return ( 
        <Drawer.Navigator 
        initialRouteName=" Campo base" 
        screenOptions={{ 
            headerShown: false, 
            drawerStyle: { backgroundColor: '#c2d3da', } 
        }}> 
            <Drawer.Screen name="Campo base" component={HomeNavegador} /> 
            <Drawer.Screen name="Quiénes somos" component={IdentidadNavegador} /> 
            <Drawer.Screen name="Calendario" component={CalendarioNavegador} /> 
            <Drawer.Screen name="Contactanos" component={ContactoNavegador} /> 
        </Drawer.Navigator>
    ); 
}

class Campobase extends Component {
    render() {
        return (
            <NavigationContainer>
                <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <DrawerNavegador/>
                </View>
            </NavigationContainer>      
        );
    }
}

export default Campobase;