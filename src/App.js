import React from 'react';
import Character from './components/Characters';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      characters: [],
      favorites :[],
      All:true,
      favorite:false
    }
  }
  async componentDidMount() {
      const response = await fetch("https://thronesapi.com/api/v2/Characters")
      const data = await response.json()
      this.setState({
        characters:data
      })
    }

  favoriteAffiche =()=>{
    this.setState({
      All:false,
      favorite:true
    })
  }
  AllAffiche =()=>{
    this.setState({
      All:true,
      favorite:false
    })
  }
	render() {
		return(
      <div className='content'>
        <h1 className='title m-2'>Game<span>of</span>thrones</h1>
        <section className='m-3'>
            <button className='filter btn m-3' onClick={this.favoriteAffiche}> Favorites</button>
            <button className='filter btn m-3' onClick={this.AllAffiche}>ALL</button>
        </section>
      {this.state.All===true ? (
        <div className='container row justify-content-center'>{this.state.characters.map((character)=>(
            <Character key={character.id} name={character.fullName} title={character.title} image={character.imageUrl} handleFavoriteClick={()=>{this.state.favorites.push(character)}} favorites={this.state.favorites}/>
            ))}
        </div> ) : (
           <div className='container row justify-content-center'>{this.state.favorites.map((favoriteCharacter)=>(
            <Character key={favoriteCharacter.id} name={favoriteCharacter.fullName} title={favoriteCharacter.title} image={favoriteCharacter.imageUrl} />
            ))}
            </div>
            )
      
      }
      </div> 
		)
	}
}

export default App