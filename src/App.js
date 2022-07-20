import React from 'react';
import Character from './components/Characters';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      characters: [], //Our Characters
      favorites :[], //Our favorites characters
      All:true,  // Boolean to switch the pages from All(Home) to Favorite(Our favorites characters)
      favorite:false
    }
  }
  async componentDidMount() { //Import the API 
      const response = await fetch("https://thronesapi.com/api/v2/Characters")
      const data = await response.json()
      this.setState({
        characters:data
      })
    }

  favoriteAffiche =()=>{ //Function that change the boolean value to switch on fav
    this.setState({
      All:false,
      favorite:true
    })
  }
  AllAffiche =()=>{ //Function that change the boolean value to switch on ALL aka home
    this.setState({
      All:true,
      favorite:false
    })
  }
	render() {
		return(
      // Nav of the page 
      <div className='content'>
        <h1 className='title m-2'>Game<span>of</span>thrones</h1>
        <section className='m-3'>
            <button className='filter btn m-3' onClick={this.favoriteAffiche}> Favorites</button>
            <button className='filter btn m-3' onClick={this.AllAffiche}>ALL</button>
        </section>
        {/* Homepage & ALL */}
        {this.state.All===true ? (
            <div className='container row justify-content-center'>
              {this.state.characters.map((character)=>(
              <Character 
              key={character.id} 
              name={character.fullName} 
              title={character.title} 
              image={character.imageUrl} 
              icon={"fa-solid fa-heart"} 
              handleFavoriteClick={()=>{
                const existingFavorite = this.state.favorites.find(
                  favorite => favorite.id === character.id
                )
                existingFavorite ? (alert("This character is already in your favorite list")) :
                this.state.favorites.push(character)
              }}
              favorites={this.state.favorites}
              />
                ))}
            </div> 
          ) : (       /*Favorites */
           <div className='container row justify-content-center'>
            {this.state.favorites.map((favoriteCharacter)=>(
            <Character 
            key={favoriteCharacter.id} 
            name={favoriteCharacter.fullName} 
            title={favoriteCharacter.title} 
            image={favoriteCharacter.imageUrl} 
            icon={"fa-solid fa-xmark"} 
            handleFavoriteClick={(favoriteCharacter)=>{const newFavorites = [...this.state.favorites];
              const index = newFavorites.indexOf(favoriteCharacter);
              newFavorites.splice(index, 1);
              this.setState({
                  favorites: newFavorites,
              });}} 
            />
            ))}
            </div>      
            )  
      }
      </div> 
		)
	}
}

export default App