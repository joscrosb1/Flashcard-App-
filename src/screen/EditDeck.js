import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";


function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({
      name: deck.name || "",
      description: deck.description || "",
    });
  
    useEffect(() => {
      async function fetchData() {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
        setFormData({
          name: fetchedDeck.name,
          description: fetchedDeck.description,
        });
      }
      fetchData();
    }, [deckId]);
    
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const updatedDeck = await updateDeck({
        ...deck,
        ...formData,
      });
      history.push(`/decks/${updatedDeck.id}`);
    };
  
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Deck Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Brief description of the deck"
              rows="3"
            />
          </div>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
  

  export default EditDeck;