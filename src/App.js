import React from 'react';
import './App.css';
import pokemonLogo from './pokemon-logo-vector.png';
import wallpaper from './Pokemon_Venusaur_chips_white_background_Doritos_1920x1080.jpg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import { Button, Image, ProgressBar, Container, Row, Col, Navbar, Nav, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container>
                <Row>
                  <Col  xs={12} >
                  <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">
                    <img
                        src={pokemonLogo}
                        width="150"
                        height="150"
                        className="d-inline-block align-top"
                        alt=""
                      />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="mr-auto">
                          <Link className="menuItem" to="/">Home</Link>
                          <Link className="menuItem" to="/PokemonGet">Pokemon</Link>
                          <Link className="menuItem" to="/CardGet">Cards</Link>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                  </Col>
                </Row>
              </Container>
              <Switch>
                        <Route path="/PokemonGet" component={PokemonGet}>
                             <PokemonGet />
                         </Route>
                          <Route path="/CardGet" component={CardGet}>
                            <CardGet />
                          </Route>
                          <Route path="/" component={Home}>
                            <Home />
                          </Route>
                        </Switch>
    </Router>
  );
}

function Home(){
  
  return (
    <div>
     <h1 style={{textTransform: 'capitalize', textAlign: 'center', }} >Pokemon Sprite and Card Generator</h1>
     <img src={wallpaper} className="wallpaper" />
    </div>
)
}

class PokemonGet extends React.Component {
  state = {
    pokemon: '',
  }

  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        progress: 25,
        msElapsed: 0,
        random: 0,
        pokemonSprite: '',
    };
}
componentDidMount() {
  //assign move to random number for object
    let moveNumberOne = Math.floor(Math.random() * 10) + 1;
    let moveNumberTwo = Math.floor(Math.random() * 20) + 11;
    let moveNumberThree = Math.floor(Math.random() * 30) + 12;
    let moveNumberFour = Math.floor(Math.random() * 30) + 13;
    //assign end of api call to random number
    let APINumber = Math.floor(Math.random() * 300) + 1;
    let APIString = String(APINumber);
    console.log(APIString);
    axios
    // make the call to the pokemon api
        .get(`https://pokeapi.co/api/v2/pokemon/` + APIString)
        .then(res => {
            const pokemon = res.data;
            console.log(pokemon);
            
            this.setState({
                pokemonName: pokemon.species.name,
                pokemonSprite: pokemon.sprites.front_default,
                moveOne: pokemon.moves[moveNumberOne].move.name,
                moveTwo: pokemon.moves[moveNumberTwo].move.name,
                moveThree: pokemon.moves[moveNumberThree].move.name,
                moveFour: pokemon.moves[moveNumberFour].move.name,
                // color: pokemon.species.id,
                isLoading: false,
                progress: 100,
                pokemonHeight: pokemon.height,
                pokemonWeight: pokemon.weight,
                // pokemonTypeOne: pokemon.types[0].type.name,
                //pokemonTypeTwo: pokemon.types[1].type.name,
            });
           // console.log(pokemonSprite);
        });
  }
 
    // show loading animation while waiting on axios 
    // function pokemonReturn() {
   
      render() {
           
        
        if (this.state.isLoading === true){
          return (
              <div>
               <ProgressBar animated now={this.state.progress} />
              </div>
          );
      // return pokemon and move set from api
         }else  if (this.state.isLoading === false){
          function refreshPage(){ 
             PokemonGet();
          }
      
          return (
         
                // <Text style={styles.developmentModeText}>{this.state.pokemonName}</Text>
                // <Text style={styles.infoText}>Type: {this.state.pokemonTypeOne}</Text>
              <Container>
                <Row>
                  <Col  xs={4}>
                  </Col>
                  <Col  xs={4}>
                  <div>
                    <h1 style={{textTransform: 'capitalize', textAlign: 'center', }}>{this.state.pokemonName}</h1>
                    <Image  style={{justifyContent: 'center', width: '50%', marginLeft: '25%', }} src={this.state.pokemonSprite} />
                    <h3  style={{textTransform: 'capitalize', textAlign: 'center', }}> Height:  
                    {this.state.pokemonHeight} 
                    </h3>
                    <h3  style={{textTransform: 'capitalize', textAlign: 'center', }}> Weight:  
                    {this.state.pokemonWeight} 
                    </h3>          
                  </div>
                  </Col>
                  <Col  xs={4}>
                  </Col>
                </Row>
                  <Row  style={{justifyContent: 'center', }}>
                    <Col xs={3}>
                    </Col>
                    <Col style={{justifyContent: 'center', marginLeft: '',}}  xs={6}>
                      <Button variant="dark" size="lg" href=""  style={{textTransform: 'capitalize', textAlign: 'center',  margin: '5px',   width: '100%',}}>
                        {this.state.moveOne}
                      </Button>
                      <Button variant="dark" size="lg" href=""  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px',   width: '100%',}}>
                        {this.state.moveThree}
                      </Button>
                      <Button variant="dark" size="lg" href=""  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px', width: '100%', }}>
                      {this.state.moveTwo}
                      </Button>
                      <Button variant="dark" size="lg" href=""  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px', width: '100%', }}>
                        {this.state.moveFour}
                        </Button>
                      </Col>
                    <Col   xs={3}>
                    </Col>
                  </Row>
                    <Row style={{justifyContent: 'center', }}>
                    <Button variant="primary" size="lg" onClick={refreshPage}>
                      <h4 style={{textTransform: 'capitalize', textAlign: 'center', color: '#fff', }}>Get New Card</h4>
                    </Button>     
                    </Row>
              </Container>
           
            
             
        );
    //  }
   }
    
    
};



}
  

class CardGet extends React.Component{
  state = {
    pokemonCards: []
}
constructor(props) {
  super(props);
  this.state = {
      isLoading: true, 
      progress: 60,

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
          <Row>
            <Col  xs={12}>
            <div  style={{textAlign: 'center', }}>
              <h1 style={{textTransform: 'capitalize', textAlign: 'center', }}>YOU GOT {this.state.pokemonName}</h1>
              <Image  style={{justifyContent: 'center', width: '6/0%', }} src={this.state.pokemonCardImage} />     
              <h3 style={{textTransform: 'capitalize', textAlign: 'center', marginTop: '10px',}}> Set: {this.state.setName}</h3> 
              <h3 style={{textTransform: 'capitalize', textAlign: 'center', marginTop: '10px',}}> Rarity: {this.state.rarity}</h3> 
              <Button variant="primary" size="lg" onClick={refreshPage}>
                <h4 style={{textTransform: 'capitalize', textAlign: 'center', color: '#fff', }}>Get New Card</h4>
              </Button>  
            </div>
            
            </Col>
          </Row>
        </Container>

    );
  }
}

}
export default App;
