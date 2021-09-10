import './App.css';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Row, Card, Col, Button } from 'react-bootstrap';
import Product from './Data.js';
import React, { useContext, useState, lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import DataStock from './DataStock';
let Detail = lazy(()=>{return import('./Detail.js')});
let Cart = lazy(()=>{return import('./Cart.js')});
// import Cart from './Cart.js'
// import Detail from './Detail.js'

let stockContext = React.createContext();

function App() {
  let [shoeList, changeShoeList] = useState(Product);
  let [selected, changeSelected] = useState(-1);
  let [shoeStock, changeShoeStock] = useState(DataStock);
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Switch>
        <Route exact path="/">
          <Jumbotron></Jumbotron>
          <stockContext.Provider value={shoeList}>
            <ProductLayout
              selected={selected}
              changeSelected={changeSelected}></ProductLayout>
            <SeeMore shoeList={shoeList} changeShoeList={changeShoeList}></SeeMore>
          </stockContext.Provider>
        </Route>
        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중입니다.</div>}>
          <Detail shoeList={shoeList} shoeStock={shoeStock}></Detail>
          </Suspense>
        </Route>
        <Route path="/cart">
        <Suspense fallback={<div>로딩중입니다.</div>}>
          <Cart></Cart>
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

function NavigationBar() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  )
}
function Jumbotron() {
  return (
    <div className="Jumbotron">
    </div>
  )
}
function ProductLayout(props) {
  let shoeList = useContext(stockContext);
  return (
    <div className="ProductLayout">
      <Row xs={1} md={3} className="g-4">
        {
          shoeList.map((content, index) => {
            return (
              <Col key={index}>
                <Card>
                  <Link onClick={() => { props.changeSelected(index) }} to={"/detail/" + index}>
                    <Card.Img variant="top" src={shoeList[index].imgSrc} />
                    <Card.Body>
                      <Card.Title>{shoeList[index].title}</Card.Title>
                      <Card.Text>{shoeList[index].content}</Card.Text>
                      <Card.Text>{shoeList[index].price}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>

              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}
function SeeMore(props) {
  return (
    <div className="SeeMore" onClick={() => {
      axios.get("https://codingapple1.github.io/shop/data2.json")
        .then((result) => {
          props.changeShoeList([...props.shoeList, ...result.data]);
          console.log(props.shoeList);
        }).catch((error) => {
        })
    }}>
      <Button variant="secondary">See More</Button>
    </div>
  )
}

export default App;
