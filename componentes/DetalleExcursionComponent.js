import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, ListItem, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
                <Card>
                    <Card.Title>{excursion.nombre}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
                    <Text style={{margin: 20}}>
                        {excursion.descripcion}
                    </Text>
                    <Icon 
                    raised 
                    reverse 
                    name={ props.favorita ? 'heart' : 'heart-o'} 
                    type='font-awesome' 
                    color='#f50' 
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentarioItem({comentario}) {
    return(
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{comentario.comentario}</ListItem.Title>
                <Text style={{fontWeight: 'bold'}}>{comentario.valoracion} estrellas</Text>
                <Text style={{marginTop: 5, color: 'gray'}}>-- {comentario.autor}, {comentario.dia}</Text>
            </ListItem.Content>
        </ListItem>
    );
}

function RenderComentario(props) { 
    const comentario = props.comentario; 
    return ( 
        <Card> 
            <Card.Title>Comentarios</Card.Title> 
            <Card.Divider/> 
            <FlatList
                scrollEnabled={false}
                data={comentario}
                renderItem={({ item }) => <RenderComentarioItem comentario={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </Card> 
    ); 
}

class DetalleExcursion extends Component {
        constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
    }

    marcarFavorito(excursionId) { 
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId)
        }); 
    }
      
    render(){
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion 
                    excursion={this.state.excursiones[+excursionId]} 
                    favorita={this.state.favoritos.some(el => el === excursionId)} 
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentario={this.state.comentarios.filter((comentario)=>comentario.excursionId === excursionId)}/>
            </ScrollView>
        );
    }
}

export default DetalleExcursion;
