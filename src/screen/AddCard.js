import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "../CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    async function loadDeck() {
      // Load the deck that the card is being added to
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    loadDeck();
  }, [deckId]);

  function handleChange({ target }) {
    // Update the form data when the user types in the "front" or "back" fields
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const card = {
      front: formData.front,
      back: formData.back,
    };
    // Create the new card and reset the form data
    createCard(deckId, card).then(() => {
      setFormData({
        front: "",
        back: "",
      });
      // Reload the page to show the new card in the list
      history.go(0);
    });
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      {/* Display the deck name and a form for creating a new card */}
      <h2>{deck.name}: Add Card</h2>
      {/* Using the shared component*/}
      <CardForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deckId={deckId}
        mode="add"
      />
    </div>
  );
}

export default AddCard;
