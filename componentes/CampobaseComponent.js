import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import Identidad from './IdentidadComponent';
import { View, Platform, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl, colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) { 
    return ( 
        <DrawerContentScrollView {...props}> 
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}> 
                <View style={styles.drawerHeader}> 
                    <View style={{flex:1}}>
                        <Image source={{uri: baseUrl+'/imagenes/logo.png'}} style={styles.drawerImage} /> 
                    </View> 
                    <View style={{flex: 2}}> 
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text> 
                    </View> 
                </View> 
                <DrawerItemList {...props} /> 
            </SafeAreaView> 
        </DrawerContentScrollView> 
    ); 
}

function CalendarioNavegador({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName= "Calendar"
            headerMode = "float"
            screenOptions = {{
                headerTintColor: '#fff',
                    headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="Calendar"
                component = { Calendario }
                options = {{
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (
                        <Icon 
                            name="menu" 
                            size={28} 
                            color= 'white' 
                            onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                        />
                    ),
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

function HomeNavegador({navigation}){
    return(
        <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
                <Icon 
                    name="menu" 
                    size={28} 
                    color= 'white' 
                    onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                />
            ),
        }}> 
            <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Campo Base', }} 
            /> 
        </Stack.Navigator>
    );
}

function IdentidadNavegador({navigation}){
    return(
        <Stack.Navigator 
        initialRouteName="Identidad" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
                <Icon 
                    name="menu" 
                    size={28} 
                    color= 'white' 
                    onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                />
            ),
        }}> 
            <Stack.Screen 
            name="Identidad" 
            component={Identidad} 
            options={{ title: 'Quiénes somos', }} 
            /> 
        </Stack.Navigator>
    );
}

function ContactoNavegador({navigation}){
    return(
        <Stack.Navigator 
        initialRouteName="Contacto" 
        screenOptions={{
            headerMode: 'screen', 
            headerTintColor: '#fff', 
            headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
                <Icon 
                    name="menu" 
                    size={28} 
                    color= 'white' 
                    onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                />
            ),
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
        initialRouteName="Home" 
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{ 
            headerShown: false, 
            drawerStyle: { backgroundColor: colorGaztaroaClaro, } 
        }}> 
            <Drawer.Screen 
                name="Campo base" 
                component={HomeNavegador} 
                options = {{
                    drawerIcon: ({ tintColor}) => ( 
                        <Icon 
                            name='home' 
                            type='font-awesome' 
                            size={24} 
                            color={tintColor}
                        />
                    )
                }}
            /> 
            <Drawer.Screen 
                name="Quiénes somos" 
                component={IdentidadNavegador}
                options = {{
                    drawerIcon: ({ tintColor}) => ( 
                        <Icon 
                            name='info-circle' 
                            type='font-awesome' 
                            size={24} 
                            color={tintColor}
                        />
                    )
                }}
            />  
            <Drawer.Screen 
                name="Calendario" 
                component={CalendarioNavegador}
                options = {{
                    drawerIcon: ({ tintColor}) => ( 
                        <Icon 
                            name='calendar' 
                            type='font-awesome' 
                            size={24} 
                            color={tintColor}
                        />
                    )
                }}
            />  
            <Drawer.Screen 
                name="Contactanos" 
                component={ContactoNavegador} 
                options = {{
                    drawerIcon: ({ tintColor}) => ( 
                        <Icon 
                            name='address-card' 
                            type='font-awesome' 
                            size={24} 
                            color={tintColor}
                        />
                    )
                }}
            /> 
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

const styles = StyleSheet.create({ 
    container: { flex: 1, }, 
    drawerHeader: { 
        backgroundColor: colorGaztaroaOscuro,
        height: 100, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1, 
        flexDirection: 'row'
    }, 
    drawerHeaderText: { 
        color: 'white', 
        fontSize: 24, 
        fontWeight: 'bold' 
    }, 
    drawerImage: { 
        margin: 10, 
        width: 80, 
        height: 60 
    } 
});

export default Campobase;