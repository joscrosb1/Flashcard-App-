import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";
import Header from "../Layout/Header";
import DeckItem from "../deck/DeckItem";

function HomeScreen() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const decksFromAPI = await listDecks();
      setDecks(decksFromAPI);
    }
    fetchData();
  }, []);

  async function handleDeleteDeck(deckId) {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this deck? You will not be able to recover it."
    );
    if (userConfirmed) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  }

  return (
    <div>
      <Header />
      <Link to="/decks/new" className="btn btn-primary mb-2">
        Create Deck
      </Link>

      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} onDelete={handleDeleteDeck} />
      ))}
    </div>
  );
}

export default HomeScreen;
