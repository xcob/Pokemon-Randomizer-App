import React from 'react';
import './App.css';
import axios from 'axios';
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

//     var x;
// let cards = document.getElementsByClassName("card");
// let style = document.getElementsByClassName("hover");

// cards.onMousemove(function(e) { 
//     // normalise touch/mouse
//     var pos = [e.offsetX,e.offsetY];
//     e.preventDefault();
//     if ( e.type === "touchmove" ) {
//       pos = [ e.touches[0].clientX, e.touches[0].clientY ];
//     }
//     var card = this.card;
//     // math for mouse position
//     var l = pos[0];
//     var t = pos[1];
//     var h = card.height();
//     var w = card.width();
//     var px = Math.abs(Math.floor(100 / w * l)-100);
//     var py = Math.abs(Math.floor(100 / h * t)-100);
//     var pa = (50-px)+(50-py);
//     // math for gradient / background positions
//     var lp = (50+(px - 50)/1.5);
//     var tp = (50+(py - 50)/1.5);
//     var px_spark = (50+(px - 50)/7);
//     var py_spark = (50+(py - 50)/7);
//     var p_opc = 20+(Math.abs(pa)*1.5);
//     var ty = ((tp - 50)/2) * -1;
//     var tx = ((lp - 50)/1.5) * .5;
//     // css to apply for active card
//     var grad_pos = `background-position: ${lp}% ${tp}%;`
//     var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
//     var opc = `opacity: ${p_opc/100};`
//     var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
//     // need to use a <style> tag for psuedo elements
//     var style = `
//       .card:hover:before { ${grad_pos} }  /* gradient */
//       .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
//     `
//     // set / apply css class and style
//     cards.removeClass("active");
//     card.removeClass("animated");
//     card.attr( "style", tf );
//     style.html(style);
//     if ( e.type === "touchmove" ) {
//       return false; 
//     }
//     clearTimeout(x);
//   }).on("mouseout touchend touchcancel", function() {
//     // remove css, apply custom animation on end
//     var card = this.card;
//     style.html("");
//     card.removeAttr("style");
//     x = setTimeout(function() {
//       card.addClass("animated");
//     },2500);
//   });
  
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
                <h1 style={{textTransform: 'uppercase', textAlign: 'center', }}>YOU GOT {this.state.pokemonName}</h1>
                <Image  style={{justifyContent: 'center', }} src={this.state.pokemonCardImage}  className='pcard animated'  />     
                <br /><br /><br />
                <h4 style={{textTransform: 'uppercase', textAlign: 'center', }}> Set: {this.state.setName}</h4> 
                <h4 style={{textTransform: 'uppercase', textAlign: 'center', marginTop: '10px',}}> Rarity: {this.state.rarity}</h4> 
                <h4 style={{textTransform: 'uppercase', textAlign: 'center', marginTop: '10px',}}> Type: {this.state.cardType}</h4> 
                <h4 style={{textTransform: 'uppercase', textAlign: 'center', marginTop: '10px',}}> Number in set: {this.state.setNumber}</h4> 
                <Button variant="info" size="lg" onClick={refreshPage}>Get New Card</Button>  
              </div>
              
              </Col>
            </Row>
          </Container>
  
      );
    }
  }
  
  }
  export default CardGet;