import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Header from "../Layout/Header";

function CreateDeck() {
  // Use the useHistory hook to allow programmatic navigation
  const history = useHistory();
  // Set up state to hold form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Function to update form data state based on user input
  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the createDeck API function to create a new deck
    const newDeck = await createDeck(formData);
    // Navigate to the newly created deck's page
    history.push(`/decks/${newDeck.id}`);
  }
   //Rendering 
  return (
    <div>
      <Header />
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      {/* Form for creating a new deck */}
      <h1>Create Deck</h1>
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
        {/* Button to cancel the creation of a new deck */}
        <Link to="/" className="btn btn-secondary mr-2">
          Cancel
        </Link>
        {/* Button to submit the form and create a new deck */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
