import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Home from './screen/HomeScreen';
import StudyScreen from "./screen/StudyScreen";
import CreateDeck from "./screen/CreateDeck";
import AddCard from "./screen/AddCard";
import EditDeck from "./screen/EditDeck";
import EditCard from "./screen/EditCard"; 
import DeckScreen from "./screen/DeckScreen";



function App() {
  return (
    <div className="app-routes">
      <Switch>
        {/* Home screen route */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* Create new deck route */}
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        {/* Study deck route */}
        <Route path="/decks/:deckId/study">
          <StudyScreen />
        </Route>
        {/* Edit deck route */}
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        {/* Add new card to deck route */}
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        {/* Edit card in deck route */}
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        {/* View deck route */}
        <Route path="/decks/:deckId">
          <DeckScreen />
        </Route>
        {/* Default route, renders the layout component */}
        <Route>
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

//keeping the routes organized, I can make sure that each component is rendered at the appropriate time and that different components don't override each other.

export default App;
