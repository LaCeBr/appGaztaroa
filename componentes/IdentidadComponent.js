import React, { Component } from 'react';
import { ListItem, Avatar, Card } from '@rneui/themed';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { ACTIVIDADES } from '../comun/actividades';
import { NOSOTROS } from '../comun/nosotros';

class Identidad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    renderCardPrueba = () => {
        const item = NOSOTROS[0];  
        return (
            <Card>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 20}}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    };

    renderActividadesItem = () => {
        return (
            <Card>
                <Card.Title>Actividades y Recursos</Card.Title>
                <Card.Divider/>
                <FlatList
                    data={this.state.actividades}
                    renderItem={this.renderActividadesLista}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Card>
        );
    };

    renderActividadesLista = ({ item }) => {
        return (
            <ListItem bottomDivider>
                <Avatar source={require('./imagenes/40Años.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={this.renderCardPrueba}
                    ListFooterComponent={this.renderActividadesItem}
                    data={[{ key: 'dummy' }]} // Un elemento de datos ficticio para que FlatList pueda renderizar los encabezados y pies
                    renderItem={() => null} // Renderizar nada para el elemento ficticio
                />
            </SafeAreaView>
        );
    }
}

export default Identidad;
