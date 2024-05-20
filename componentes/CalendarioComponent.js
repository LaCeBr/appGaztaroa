import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => { 
    return { 
        excursiones: state.excursiones 
    } 
}

class Calendario extends Component {

    render(){

        const { navigate } = this.props.navigation;
        const { excursiones } = this.props.excursiones;

        if (excursiones.errMess){
            return( 
                <View> 
                    <Text>{props.errMess}</Text> 
                </View> 
            ); 
        }else if(excursiones.isLoading){
            return( 
                <IndicadorActividad/>
            );
        }else{
            const renderCalendarioItem = ({ item, index }) => {
                return (
                    <ListItem
                        key={index}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        bottomDivider>
                        <Avatar source={{uri: baseUrl+item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title style={{fontWeight: 'bold'}}>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            };
    
            return (
                <SafeAreaView>
                    <FlatList
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default connect(mapStateToProps)(Calendario);
