export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addCard(deckTitle, card) {
    return {
        type: ADD_CARD,
        deckTitle,
        card
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}


