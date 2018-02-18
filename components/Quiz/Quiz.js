import React, {Component} from 'react'
import {COLORS} from '../../utils/constants';
import {
    View,
    StyleSheet,
} from 'react-native'
import {Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {shuffle} from 'lodash';
import {setLocalNotification, clearLocalNotification} from '../../utils/helpers';


class Question extends Component {
    state = {
        showAnswer: false,
    };

    componentWillReceiveProps() {
        this.setState({
            showAnswer: false,
        });
    }

    render() {
        const {question} = this.props;
        const {showAnswer} = this.state;

        return (
            <View style={styles.question}>
                <Text h4 style={{textAlign: 'center'}}>
                    {showAnswer
                        ? question.answer
                        : question.question}
                </Text>
                <Button
                    onPress={() => {
                        this.setState({showAnswer: !showAnswer})
                    }}
                    title={showAnswer ? 'Question' : 'Answer'}
                    color={COLORS.FAIL_COLOR}
                    buttonStyle={{
                        width: 300,
                        height: 45,
                        borderRadius: 5,
                        backgroundColor: 'transparent'
                    }}
                />
            </View>
        )
    }
}

class Quiz extends Component {
    state = {
        currentQuestionIndex: 0,
        score: 0,
        showScore: false,
        questions: shuffle(this.props.deck.questions)
    };

    resetNotification() {
        clearLocalNotification()
            .then(setLocalNotification);
    }

    handleAnswer(correct) {
        const {currentQuestionIndex, score, questions} = this.state;

        if (correct) {
            this.setState({
                score: score + 1
            })
        }
        if (currentQuestionIndex < questions.length - 1) {
            this.setState({
                currentQuestionIndex: currentQuestionIndex + 1
            })
        } else {
            this.resetNotification();
            this.setState({
                showScore: true
            })
        }
    }

    restartQuiz = () => {
        this.setState({
            currentQuestionIndex: 0,
            score: 0,
            showScore: false,
            questions: shuffle(this.props.deck.questions)
        });
    };

    render() {
        const {navigation} = this.props;
        const {currentQuestionIndex, showScore, score, questions} = this.state;

        if (questions.length < 1) {
            return (<View style={styles.question}>
                <Text h4>No Cards Available</Text>
            </View>)
        }

        return (
            showScore
                ? (<View style={styles.score}>
                    <Text h4>{`Your score is ${score}`}</Text>
                    <Button
                        onPress={this.restartQuiz}
                        title="Restart Quiz"
                        buttonStyle={{
                            width: 300,
                            height: 45,
                            borderRadius: 5,
                            marginTop: 20,
                            backgroundColor: COLORS.PRIMARY_COLOR
                        }}
                    />
                    <Button
                        onPress={() => {
                            navigation.goBack();
                        }}
                        title="Back to Deck"
                        buttonStyle={{
                            width: 300,
                            height: 45,
                            borderRadius: 5,
                            marginTop: 20
                        }}
                    />
                </View>)
                : (<View style={styles.container}>
                    <Text>{`${currentQuestionIndex + 1} / ${questions.length}`}</Text>
                    <Question question={questions[currentQuestionIndex]}/>
                    <View style={styles.quizActions}>
                        <Button
                            onPress={() => this.handleAnswer(true)}
                            title="Correct"
                            buttonStyle={{
                                width: 300,
                                height: 45,
                                borderRadius: 5,
                                backgroundColor: COLORS.SUCCESS_COLOR
                            }}
                        />
                        <Button
                            onPress={() => this.handleAnswer(false)}
                            title="Incorrect"
                            buttonStyle={{
                                width: 300,
                                height: 45,
                                borderRadius: 5,
                                marginTop: 20,
                                backgroundColor: COLORS.FAIL_COLOR
                            }}
                        />
                    </View>
                </View>)
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 60,
    },
    question: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    score: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


function mapStateToProps(decks, {navigation}) {
    return {
        deck: decks[navigation.state.params.deckTitle]
    }
}

export default connect(
    mapStateToProps
)(Quiz)

