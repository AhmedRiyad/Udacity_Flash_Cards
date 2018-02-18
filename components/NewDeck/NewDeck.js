import React, {Component} from 'react'
import {COLORS} from '../../utils/constants';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'
import {Button, Text, FormInput, FormValidationMessage} from 'react-native-elements';
import {addDeck} from '../../actions';
import {connect} from 'react-redux';
import {saveDeckTitle} from '../../utils/api';


class NewDeck extends Component {
    state = {
        titleText: '',
        errorMessage: '',
    };

    handleSubmit = () => {
        const {titleText} = this.state;
        const {addDeck, navigation, decks} = this.props;

        if (!titleText) {
            this.setState({
                errorMessage: 'This field is required',
            })
        } else if (decks[titleText]) {
            this.setState({
                errorMessage: 'Deck already exists',
            })
        } else {
            this.titleInput.clearText();
            this.setState({
                titleText: '',
                errorMessage: false
            });
            saveDeckTitle(titleText)
                .then(() => {
                    addDeck(titleText);
                    navigation.goBack();
                })
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <View>
                        <Text h1 style={{textAlign: 'center'}}>What is the title of your new deck?</Text>
                    </View>

                    <View>
                        <FormInput
                            placeholder='Deck Title'
                            keyboardType='default'
                            containerStyle={styles.titleInput}
                            onChangeText={titleText => this.setState({titleText})}
                            ref={input => this.titleInput = input}
                        />
                        <FormValidationMessage>
                            {this.state.errorMessage}
                        </FormValidationMessage>
                    </View>

                    <Button
                        title="Submit"
                        onPress={this.handleSubmit}
                        buttonStyle={{
                            width: 170,
                            height: 45,
                            borderRadius: 5,
                            marginTop: 20,
                            backgroundColor: COLORS.PRIMARY_COLOR,
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
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
    },
    titleInput: {
        width: 270,
        height: 45,
        borderColor: COLORS.BORDER_COLOR,
        backgroundColor: COLORS.BAR_COLOR,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    }
});


function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDeck: (title) => dispatch(addDeck(title))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)


