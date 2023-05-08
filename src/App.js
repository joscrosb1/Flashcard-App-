import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Home from './screen/HomeScreen';
import StudyScreen from "./screen/StudyScreen";
import CreateDeck from "./screen/CreateDeck";
import AddCard from "./screen/AddCard";
import EditDeck from "./screen/EditDeck";
import EditCard from "./screen/EditCard"; // Import the EditCard component
import DeckScreen from "./screen/DeckScreen";

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyScreen />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId">
          <DeckScreen />
        </Route>
        <Route>
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
