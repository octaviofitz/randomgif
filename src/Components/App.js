import { Component } from 'react';
import './App.css';
import Gif from './Gif';

class App extends Component {

  /* aquí colocamos el estado inicial */

    constructor() {
      super()
      this.state= {
        gifs: []
      }
    }


  render (){
  return (
   <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">GIPHY APP</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="nav ml-auto">
          <li className="nav-item">
            <button onClick={() => this.addGif()} className="btn btn-success">Cargar random</button>
          </li>
        </ul>
      </div>
    </nav>
  
    
    <div className="container mt-3">
  
      
      <div className="row text-center">

        {
          this.state.gifs.map((gif,index) => {
            return <Gif key={gif.title +index} title={gif.title} image_original_url={gif.image_original_url} />
          })
        }
  
      </div>
      
  
    </div>
    </>
  );
}
 async randomGif() {
   try { /* traigo mediante fetch el endpoint y lo guardo en variable response */
     let response= await fetch('https://api.giphy.com/v1/gifs/random?api_key=mb34iFPWQv9DQkxRqh5PGOkaXlbDK2SD&tag=&rating=g');
     let result= await response.json() /* ese resultado lo guardo como un json */
     return result
   } catch (error) {
     console.log(error);
   }
   }

   async addGif(){
     let newGif= await this.randomGif()
     this.setState({
       gifs: [
         ...this.state.gifs,
         {
           title:newGif.data.title,
           image_original_url:newGif.data.image_original_url
         }
        ]
     })
   }

  
 
async componentDidMount(){
  console.log('Se montó el componente ');
  let firstGif= await this.randomGif()
  this.setState({
    gifs:[
      {
        title:firstGif.data.title,
        image_original_url:firstGif.data.image_original_url
      }
    ]
  })
}
}



export default App;
