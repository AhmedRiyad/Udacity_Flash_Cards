import {AsyncStorage} from 'react-native'

const FLASH_CARDS_STORAGE_KEY = 'Udacicards:flashcards';
const DUMMY_DATA = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

export function getDecks() {
    return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
        .then((results) => {
            return results === null
                ? setDummyData()
                : JSON.parse(results)
        })
}

export function getDeck(id) {
    return getDecks()
        .then((results) => {
            return results[id];
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, {question, answer}) {
    return getDeck(title)
        .then((deck) => {
            return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    ...deck,
                    questions: [...deck.questions, {question, answer}]
                }
            }))
        });
}

function setDummyData() {
    AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(DUMMY_DATA));
    return DUMMY_DATA;
}


// export function removeEntry(key) {
//     return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
//         .then((results) => {
//             const data = JSON.parse(results);
//             data[key] = undefined;
//             delete data[key];
//             AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(data))
//         })
// }

//
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck