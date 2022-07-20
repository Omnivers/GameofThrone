import React from 'react'

class Character extends React.Component {
	render() {
		return(
         <div className='card m-4 col-6 '>
             <img src={this.props.image} className="card-img-top" alt={this.props.name}/>
                <div className='card-body d-flex flex-column'>
                    <h1 className='card-title'>{this.props.name}</h1>
                    <p className='card-text'>{this.props.title}</p>   
                </div>
                <button className="btn filter btn-primary m-3" onClick={this.props.handleFavoriteClick}>
                <i className={this.props.icon}></i></button>
        </div>
		)
	}
}

export default Character