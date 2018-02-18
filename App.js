import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Ionicons, Entypo} from '@expo/vector-icons';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {COLORS} from './utils/constants';
import DeckList from './components/DeckList/DeckList';
import Deck from './components/Deck/Deck';
import Quiz from './components/Quiz/Quiz';
import NewDeck from './components/NewDeck/NewDeck';
import AddCard from './components/AddCard/AddCard';


const Tabs = TabNavigator({
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={30} color={tintColor}/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => <Entypo name="add-to-list" size={30} color={tintColor}/>
        }
    }
}, {

    tabBarOptions: {
        activeTintColor: COLORS.PRIMARY_COLOR,
        style: {
            backgroundColor: COLORS.BAR_COLOR,
        }
    },
    animationEnabled: true,
    swipeEnabled: true
});

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            title: "Flash Cards",
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: COLORS.PRIMARY_COLOR

            }
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: COLORS.PRIMARY_COLOR
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: "Quiz",
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: COLORS.PRIMARY_COLOR
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: "Add Card",
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: COLORS.PRIMARY_COLOR
            }
        }
    },
});


export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <StatusBar
                        translucent
                        backgroundColor={COLORS.PRIMARY_COLOR}
                        barStyle="light-content"
                    />
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
