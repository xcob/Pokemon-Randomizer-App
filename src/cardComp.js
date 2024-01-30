import React from 'react';
import './App.css';
import axios from 'axios';
import styled from "styled-components";
import { Button, Image, ProgressBar, Container, Row, Col} from 'react-bootstrap';
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
              setNumber: cards.card.number,
              cardType: cards.card.types[0],
              setName: cards.card.set,
              rarity: cards.card.rarity
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
    }else if (this.state.isLoading === false){
      function refreshPage(){ 
          window.location.reload(); 
      }
        return (
          <Container>
            <Row >
              <Col  xs={12} className="justify-content-xs-center">
              <div  style={{textAlign: 'center', }}>
                <PokemonName>You got {this.state.pokemonName}</PokemonName>
                <Image  style={{justifyContent: 'center', }} src={this.state.pokemonCardImage}  className='pcard animated'  />     
                <br /><br /><br />
                <StatsText> Set: {this.state.setName}</StatsText> 
                <StatsText> Rarity: {this.state.rarity}</StatsText> 
                <StatsText> Type: {this.state.cardType}</StatsText> 
                <StatsText> Number in set: {this.state.setNumber}</StatsText> 
                <NewPokemonCardButton onClick={refreshPage}>Get New Card</NewPokemonCardButton>  
              </div>
              
              </Col>
            </Row>
          </Container>
  
      );
    }
  }
  
  }


const StatsText = styled.p`
  font-weight: bold;
  font-size: 1em;
  color: #DCE1E9;
`;

const NewPokemonCardButton = styled(Button)`
  background-color: #53D8FB;
  border-color: #53D8FB;
  margin-bottom: 40px;
`


const PokemonName = styled.h1`
  font-weight: bold;
  font-size: 2em;
  text-transform: uppercase;
  color: #DCE1E9;
`;


  export default CardGet;



