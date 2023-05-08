import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";

function DeckScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function fetchData() {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    }
    fetchData();
  }, [deckId]);

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      // Delete the deck
      history.push("/");
    }
  }

  function handleDeleteCard(cardId) {
    if (window.confirm("Are you sure you want to delete this card?")) {
      // Delete the card
      const updatedDeck = {
        ...deck,
        cards: deck.cards.filter((card) => card.id !== cardId),
      };
      setDeck(updatedDeck);
      deleteCard(cardId);
    }
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      {/* Deck information */}
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      {/* Action buttons */}
      <div className="mb-3">
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-2">
          Add Cards
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>

      {/* Card list */}
      <h3>Cards</h3>
      <ul className="list-group">
        {deck.cards &&
          deck.cards.map((card) => (
            <li className="list-group-item" key={card.id}>
              <div className="row">
                <div className="col-sm-6">
                  <p>{card.front}</p>
                </div>
                <div className="col-sm-6">
                  <p>{card.back}</p>
                </div>
              </div>
              <div>
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DeckScreen;
