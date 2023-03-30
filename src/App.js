import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      categories: [
        { name: 'Umum', id: 'general' },
        { name: 'Bisnis', id: 'business' },
        { name: 'Teknologi', id: 'technology' },
        { name: 'Hiburan', id: 'entertainment' },
        { name: 'Olahraga', id: 'sports' },
      ],
      selectedCategory: 'general',
      searchKeyword: '',
      API_KEY: '6b5961f73bde4899be1a768a6a3aeed7',
    };
  }

  componentDidMount() {
    this.getNewsArticles(this.state.selectedCategory);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCategory !== prevState.selectedCategory) {
      this.getNewsArticles(this.state.selectedCategory);
    }
  }

  async getNewsArticles(category, keyword) {
    let url = `https://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${this.state.API_KEY}`;
    if (keyword) {
      url = `https://newsapi.org/v2/top-headlines?country=id&q=${keyword}&apiKey=${this.state.API_KEY}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ articles: data.articles });
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  handleSearchChange = (event) => {
    this.setState({ searchKeyword: event.target.value });
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.getNewsArticles(this.state.selectedCategory, this.state.searchKeyword);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <h1>Berita</h1>
          <form onSubmit={this.handleSearchSubmit} >
          <Form.Group>
              <Form.Control type="text" placeholder="Cari Berita" value={this.state.searchKeyword} onChange={this.handleSearchChange} />
          </Form.Group>
          </form>
          <Nav variant="tabs" defaultActiveKey={this.state.selectedCategory}>
            {this.state.categories.map((category) => (
              <Nav.Item key={category.id}>
                <Nav.Link as={Link} to={`/${category.id}`} eventKey={category.id} onClick={() => this.handleCategoryChange(category.id)}>
                  {category.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Switch>
            {this.state.categories.map((category) => (
              <Route key={category.id} path={`/${category.id}`}>
                <h2>{category.name}</h2>
                <div className="row">
                  {this.state.articles.map((article, index) => (
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
}

export default App;



