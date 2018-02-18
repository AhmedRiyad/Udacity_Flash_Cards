import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import {Card} from 'react-native-elements';
import {COLORS} from '../../utils/constants';
import {connect} from 'react-redux';
import {receiveDecks} from '../../actions';
import {getDecks} from '../../utils/api';


class DeckList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        getDecks()
            .then((decks) => {
                dispatch(receiveDecks(decks))
            })
    }

    renderItem = ({item}) =>
        <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate(
                    'Deck',
                    {
                        deckTitle: item.title
                    }
                )
            }}
        >
            <Card
                title={item.title}>
                <Text style={styles.cardText}>
                    {`${item.questions.length} cards`}
                </Text>
            </Card>
        </TouchableOpacity>;


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.decks}
                    renderItem={this.renderItem}
                />
            </View>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
    },
    cardText: {
        textAlign: 'center',
    }
});

function mapStateToProps(decks) {
    return {
        decks: Object.keys(decks).map((key) => {
            return {...decks[key], key}
        })
    }
}

export default connect(
    mapStateToProps
)(DeckList)
