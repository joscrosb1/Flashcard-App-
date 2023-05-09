import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "../CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    async function fetchData() {
      const fetchedDeck = await readDeck(deckId);
      const fetchedCard = await readCard(cardId);
      setDeck(fetchedDeck);
      setCard(fetchedCard);
      // Prefill form with existing card data
      setFormData({
        front: fetchedCard.front,
        back: fetchedCard.back,
      });
    }
    fetchData();
  }, [deckId, cardId]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const updatedCard = {
      ...card,
      front: formData.front,
      back: formData.back,
    };
    await updateCard(updatedCard);
    history.push(`/decks/${deckId}`);
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  // Render a "Loading..." message until the deck data has been fetched
  if (!deck.name) {
    return <p>Loading...</p>;
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

      {/* Using the shared component */}
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mode="edit"
      />
    </div>
  );
}

export default EditCard;
