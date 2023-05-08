import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

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
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    loadDeck();
  }, [deckId]);

  function handleChange({ target }) {
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
    createCard(deckId, card).then(() => {
      setFormData({
        front: "",
        back: "",
      });
      history.go(0);
    });
  }

  return (
    <div>
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
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            rows="4"
            onChange={handleChange}
            value={formData.front}
            placeholder="Front side of card"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            rows="4"
            onChange={handleChange}
            value={formData.back}
            placeholder="Back side of card"
            required
          ></textarea>
        </div>
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-primary ml-2"
        >
          Done
        </Link>
      </form>
    </div>
  );
}

export default AddCard;
