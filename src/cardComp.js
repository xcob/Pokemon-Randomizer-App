import React from 'react';
import './App.css';
import pokemonLogo from './pokemon-logo-vector.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import { Button, Image, ProgressBar, Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class CardGet extends React.Component{
    state = {
      pokemonCards: []
  }
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true, 
        progress: 50,
  
    };
  }
  
  componentDidMount() {
  
    //assign move to random number for object
        // let moveNumberOne = Math.floor(Math.random() * 35) + 1;
        // let moveNumberTwo = Math.floor(Math.random() * 20) + 11;
        // let moveNumberThree = Math.floor(Math.random() * 30) + 12;
        // let moveNumberFour = Math.floor(Math.random() * 30) + 13;
        //assign end of api call to random number
        let APINumber = Math.floor(Math.random() * 40) + 1;
        let APIString = String(APINumber);
        let baseSetNumberAPI = Math.floor(Math.random() * 6) + 1;
        let baseSetNumber = String(baseSetNumberAPI);
        
        //console.log(APIString);
    axios
    // make the call to the pokemon api
        .get(`https://api.pokemontcg.io/v1/cards/base` + baseSetNumber + `-` + APIString, {
          // headers: {
          //   Count: 10,  
          // }
        })
        .then(res => {
            const cards = res.data;
            console.log(cards);
            this.setState({
              pokemonCardImage: cards.card.imageUrl,
              pokemonName: cards.card.name,
              isLoading: false,
              progress: 100,
              setName: cards.card.set,
            });
        })
  }
  render() {
    // show loading animation while waiting on axios 
    if (this.state.isLoading === true){
      return (
          <div>
           <ProgressBar animated now={this.state.progress} />
          </div>
      );
  
      // return pokemon card and name currently 
    }else if (this.state.isLoading == false){
      function refreshPage(){ 
          window.location.reload(); 
      }
        return (
          <Container>
            <Row>
              <Col  xs={12}>
              <div  style={{textAlign: 'center', }}>
                <h1 style={{textTransform: 'capitalize', textAlign: 'center', }}>YOU GOT {this.state.pokemonName}</h1>
                <Image  style={{justifyContent: 'center', width: '6/0%', }} src={this.state.pokemonCardImage} />     
                <h3 style={{textTransform: 'capitalize', textAlign: 'center', }}> Set: {this.state.setName}</h3> 
                <Button variant="primary" size="lg" onClick={refreshPage}>
                  <h4 to="/CardGet" style={{textTransform: 'capitalize', textAlign: 'center', color: '#fff', }}>Get New Card</h4>
                </Button>  
              </div>
              
              </Col>
            </Row>
          </Container>
  
      );
    }
  }
  
  }
  export default CardGet;