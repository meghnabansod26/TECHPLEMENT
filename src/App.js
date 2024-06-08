import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QuoteCard from "./components/QuoteCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState({ quoteText: "", quoteAuthor: "" });
  const intervalRef = useRef(null);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        "https://quote-garden.onrender.com/api/v3/quotes/random"
      );
      setQuote(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  const fetchQuoteByAuthor = async (author) => {
    clearInterval(intervalRef.current);
    try {
      const response = await axios.get(
        `https://quote-garden.onrender.com/api/v3/quotes`,
        {
          params: { author },
        }
      );
      if (response.data.data.length > 0) {
        setQuote(response.data.data[0]);
      } else {
        alert("No quotes found for this author");
      }
    } catch (error) {
      console.error("Error fetching quote by author:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
    intervalRef.current = setInterval(fetchRandomQuote, 2000); // Change quote every 10 seconds
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App">
      <h1 className="heading">Quote of the Day</h1>
      <SearchBar onSearch={fetchQuoteByAuthor} />
      <QuoteCard quote={quote} />
    </div>
  );
};

export default App;
