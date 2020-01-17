import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import { Button, Image, ProgressBar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container>
                <Row>
                  <Col  xs={12} >
                  <div>
                    <nav>
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/PokemonGet">Pokemon</Link>
                        </li>
                        <li>
                          <Link to="/users">Users</Link>
                        </li>
                      </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                      <Route path="/PokemonGet">
                        <PokemonGet />
                      </Route>
                      <Route path="/users">
                        <Users />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </div>
                  </Col>
                </Row>
              </Container>
     
    </Router>
  );
}

function Home(){
  
  return (
    <div>
      <Button variant="primary" size="lg" href="/PokemonGet">
        <Link to="/PokemonGet" style={{textTransform: 'capitalize', textAlign: 'center', color: '#fff', }}>Pokemon</Link>
      </Button>
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
    //   if (this.state.isLoading == true){
       
    //           <div>
    //            <ProgressBar animated now={45} />
    //           </div>
        
          
      //  return pokemon and move set from api
    //  }else  if (this.state.isLoading == false){
      
      render() {
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
                    <Col  xs={6}>
                        <Button variant="primary" size="lg" href="/"  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px', }}>
                        {this.state.moveOne}
                        </Button>
                      </Col>
                    <Col  xs={6}>
                      <Button variant="primary" size="lg" href="/"  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px',  }}>
                      {this.state.moveTwo}
                      </Button>
                    </Col>
                    </Row>
                    <Row>
                      <Col  xs={6}>
                        <Button variant="primary" size="lg" href="/"  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px',  }}>
                        {this.state.moveThree}
                        </Button>
                      </Col>
                      <Col  xs={6}>
                        <Button variant="primary" size="lg" href="/"  style={{textTransform: 'capitalize', textAlign: 'center', margin: '5px',  }}>
                        {this.state.moveFour}
                        </Button>
                      </Col>
                    </Row>
              </Container>
           
            
             
        );
    //  }
   }
    
    
};




  

function Users() {
  return <h2>Users</h2>;
}

export default App;
