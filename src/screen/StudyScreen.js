import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Header from "../Layout/Header";

function StudyScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [showFront, setShowFront] = useState(true);

  // Fetch the deck data from the API
  useEffect(() => {
    async function fetchData() {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    }
    fetchData();
  }, [deckId]);

  // Flip the card to show the back side
  const handleFlip = () => {
    setShowFront(!showFront);
  };

  // Move to the next card or restart if on the last card
  const handleNext = () => {
    if (currentCard + 1 < deck.cards.length) {
      setCurrentCard(currentCard + 1);
      setShowFront(true);
    } else {
      // Confirm with the user before restarting the cards
      if (window.confirm('Restart cards? Click "Cancel" to return to the home page.')) {
        setCurrentCard(0);
        setShowFront(true);
      } else {
        history.push('/');
      }
    }
  };

  // Render a message if there are not enough cards to study
  const renderNotEnoughCards = () => {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are currently {deck.cards.length} cards in this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  };

  // Render the study screen
  if (!deck.cards) {
    // If the deck data is not yet loaded, show a loading message
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      {deck.cards.length < 3 ? (
        // If there are not enough cards, render a message
        renderNotEnoughCards()
      ) : (
        // Otherwise, render the card
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCard + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">
              {showFront ? deck.cards[currentCard].front : deck.cards[currentCard].back}
            </p>
            <button onClick={handleFlip} className="btn btn-secondary mr-2">
              Flip
            </button>
            {!showFront && (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default StudyScreen;
