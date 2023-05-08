import React from "react";
import { Link } from "react-router-dom";

function DeckItem({ deck, onDelete }) {
  return (
    <div className="card mb-3" style={{ maxWidth: "70rem", margin: "auto" }}>
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="card-title">{deck.name}</h5>
          <span className="badge badge-secondary">{deck.cards.length} cards</span>
        </div>
        <p className="card-text">{deck.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to={`/decks/${deck.id}`} className="btn btn-primary">
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckItem;
