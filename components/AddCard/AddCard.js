import React, {Component} from 'react'
import {COLORS} from '../../utils/constants';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'
import {
    Button,
    Text,
    FormInput,
    FormValidationMessage,
    FormLabel
} from 'react-native-elements';
import {addCardToDeck} from '../../utils/api';
import {connect} from 'react-redux';
import {addCard} from '../../actions';


class AddCard extends Component {
    state = {
        questionText: '',
        answerText: '',
        questionErrorMessage: false,
        answerErrorMessage: false
    };

    handleSubmit = () => {
        const {navigation, addCard} = this.props;
        const {questionText, answerText} = this.state;

        this.setState({
            questionErrorMessage: false,
            answerErrorMessage: false
        });

        if (!questionText) {
            this.setState({
                questionErrorMessage: true
            })
        } else if (!answerText) {
            this.setState({
                answerErrorMessage: true
            })
        } else {
            addCardToDeck(navigation.state.params.deckTitle, {
                question: questionText,
                answer: answerText
            }).then(() => {
                addCard(navigation.state.params.deckTitle, {
                    question: questionText,
                    answer: answerText
                });
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
                <View>
                    <Text h3 style={{textAlign: 'center'}}>Add Card</Text>
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <View>
                        <FormLabel>Question</FormLabel>
                        <FormInput
                            placeholder='Question'
                            keyboardType='default'
                            containerStyle={styles.questionInput}
                            onChangeText={questionText => this.setState({questionText})}
                        />
                        <FormValidationMessage>
                            {this.state.questionErrorMessage ? 'This field is required' : ''}
                        </FormValidationMessage>
                    </View>
                    <View>
                        <FormLabel>Answer</FormLabel>
                        <FormInput
                            placeholder='Answer'
                            keyboardType='default'
                            containerStyle={styles.answerInput}
                            onChangeText={answerText => this.setState({answerText})}
                        />
                        <FormValidationMessage>
                            {this.state.answerErrorMessage ? 'This field is required' : ''}
                        </FormValidationMessage>
                    </View>

                    <Button
                        onPress={this.handleSubmit}
                        title="Submit"
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
    questionInput: {
        width: 300,
        height: 45,
        borderColor: COLORS.BORDER_COLOR,
        backgroundColor: COLORS.BAR_COLOR,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    answerInput: {
        width: 300,
        height: 45,
        borderColor: COLORS.BORDER_COLOR,
        backgroundColor: COLORS.BAR_COLOR,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    }
});

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)


