import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

function App() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([
    { name: 'Umum', id: 'general' },
    { name: 'Bisnis', id: 'business' },
    { name: 'Teknologi', id: 'technology' },
    { name: 'Hiburan', id: 'entertainment' },
    { name: 'Olahraga', id: 'sports' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchKeyword, setSearchKeyword] = useState('');
  const API_KEY = '6b5961f73bde4899be1a768a6a3aeed7';

  useEffect(() => {
    getNewsArticles(selectedCategory);
  }, [selectedCategory]);

  const getNewsArticles = async (category, keyword) => {
    let url = `https://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${API_KEY}`;
    if (keyword) {
      url = `https://newsapi.org/v2/top-headlines?country=id&q=${keyword}&apiKey=${API_KEY}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getNewsArticles(selectedCategory, searchKeyword);
  };

  return (
    <Router>
      <div className="container">
        <h1>Berita</h1>
        <form onSubmit={handleSearchSubmit}>
          <Form.Group>
            <Form.Control type="text" placeholder="Cari Berita" value={searchKeyword} onChange={handleSearchChange} />
          </Form.Group>
        </form>
        <Nav variant="tabs" defaultActiveKey={selectedCategory}>
          {categories.map((category) => (
            <Nav.Item key={category.id}>
              <Nav.Link as={Link} to={`/${category.id}`} eventKey={category.id} onClick={() => handleCategoryChange(category.id)}>
                {category.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Switch>
          {categories.map((category) => (
            <Route key={category.id} path={`/${category.id}`}>
              <h2>{category.name}</h2>
              <div className="row">
                {articles.map((article, index) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={index}>
                    <Card>
                      <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
                      <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>{article.description}</Card.Text>
                        <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-primary">Selengkapnya</a>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
