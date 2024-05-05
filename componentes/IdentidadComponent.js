import React, { Component } from 'react';
import { ListItem, Avatar, Card } from '@rneui/themed';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { NOSOTROS } from '../comun/nosotros'
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
    return { 
        actividades: state.actividades 
    } 
}

class Identidad extends Component {
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
                    data={this.props.actividades.actividades}
                    renderItem={this.renderActividadesLista}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Card>
        );
    };

    renderActividadesLista = ({ item }) => {
        return (
            <ListItem bottomDivider>
                <Avatar source={{uri: baseUrl+item.imagen}} />
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>{item.nombre}</ListItem.Title>
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

export default connect(mapStateToProps)(Identidad);
