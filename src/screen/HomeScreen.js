import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";
import Header from "../Layout/Header";
import DeckItem from "../deck/DeckItem";

function HomeScreen() {
  // State to hold the array of decks
  const [decks, setDecks] = useState([]);

  // Use Effect hook to load decks from the API and update the state
  useEffect(() => {
    async function fetchData() {
      const decksFromAPI = await listDecks();
      setDecks(decksFromAPI);
    }
    fetchData();
  }, []);

  // Function to delete a deck from the API and update the state
  async function handleDeleteDeck(deckId) {
    // A window message pop up showing the message"
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this deck? You will not be able to recover it."
    );
    if (userConfirmed) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  }
   // rendering 
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
