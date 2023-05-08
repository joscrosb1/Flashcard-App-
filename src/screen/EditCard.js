import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            onChange={handleChange}
            value={formData.front}
            placeholder="Front side of card"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            onChange={handleChange}
            value={formData.back}
            placeholder="Back side of card"
            rows="3"
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
