import React, {Component} from 'react'
import {COLORS} from '../../utils/constants';
import {
    View,
    StyleSheet,
} from 'react-native'
import {Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';


class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.deckTitle
        }
    };

    render() {
        const {deck} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text h1>{deck.title}</Text>
                    <Text h4>{deck.questions.length} Cards</Text>
                </View>
                <View>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate(
                                'AddCard', {deckTitle: deck.title}
                            )
                        }}
                        title="Add Card"
                        buttonStyle={{
                            width: 300,
                            height: 45,
                            borderRadius: 5,
                        }}
                    />
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate(
                                'Quiz', {deckTitle: deck.title}
                            )
                        }}
                        title="Start Quiz"
                        buttonStyle={{
                            width: 300,
                            height: 45,
                            borderRadius: 5,
                            marginTop: 20,
                            backgroundColor: COLORS.PRIMARY_COLOR,
                        }}
                    />
                </View>
            </View>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 60,
    }
});

function mapStateToProps(decks, {navigation}) {
    return {
        deck: decks[navigation.state.params.deckTitle]
    }
}

export default connect(
    mapStateToProps
)(Deck)

