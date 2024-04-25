import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from '@rneui/themed';
import { CONTACTO } from '../comun/contacto';

class Contacto extends Component {
    render() {    
        const item = CONTACTO[0];    
        return(
            <Card>
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 20}}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    }
}

export default Contacto;
