import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Clothes from "./components/Clothes";
import Tech from "./components/Tech";

const link = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
});

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/tech" element={<Tech />} />
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
