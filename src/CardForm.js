import React from "react";
import { Link } from "react-router-dom";

// Having a shared component makes it easier to not duplicate the same code in other components , aka DRY (Don't Repeat Yourself)
// Im using this shared component as a form for the add and edd card components. 

function CardForm({ formData, handleChange, handleSubmit, deckId, mode }) {
  return (
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

      <button type="submit" className="btn btn-primary">
        Save
      </button>
      {mode === "edit" && (
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
      )}
      {mode === "add" && (
        <Link to={`/decks/${deckId}`} className="btn btn-primary ml-2">
          Done
        </Link>
      )}
    </form>
  );
}

export default CardForm;
