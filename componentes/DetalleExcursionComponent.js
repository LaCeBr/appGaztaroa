import React, { Component, useState } from 'react';
import { Text, View, ScrollView, FlatList, Modal } from 'react-native';
import { Card, ListItem, Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun'; 
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import Formulario from './Formulario';


const mapStateToProps = state => { 
    return { 
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    } 
}

const mapDispatchToProps = dispatch => ({ 
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)) 
})

function RenderExcursion(props) {

    const [modalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
                <Card>
                    <Card.Title>{excursion.nombre}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri: baseUrl+excursion.imagen}}></Card.Image>
                    <Text style={{margin: 20}}>
                        {excursion.descripcion}
                    </Text>
                    <View style={{flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10}}>
                        <Icon 
                            raised 
                            reverse 
                            name={ props.favorita ? 'heart' : 'heart-o'} 
                            type='font-awesome' 
                            color='#f50' 
                            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='edit'
                            type='font-awsome'
                            color='blue'
                            onPress={toggleModal}
                        />
                    </View>
                    <Modal 
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={toggleModal}>
                        <View style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            <Formulario toggleModal={toggleModal} excursionId = {excursion.id}/>
                        </View>
                    </Modal> 
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
                keyExtractor={item => (item.id ? item.id.toString() : Date.now().toString())}
            />
        </Card> 
    ); 
}

class DetalleExcursion extends Component {

    marcarFavorito(excursionId) { 
        this.props.postFavorito(excursionId);
    }
      
    render(){
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion 
                    excursion={this.props.excursiones.excursiones[+excursionId]} 
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario comentario={this.props.comentarios.comentarios.filter((comentario)=>comentario.excursionId === excursionId)}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
