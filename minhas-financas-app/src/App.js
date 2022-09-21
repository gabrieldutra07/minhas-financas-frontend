import React from 'react'

class App extends React.Component {

    state = {
      numero1: null,
      numero2: null,
      resultado: null
    }

    somar = () => {
        const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2)
        this.setState({resultado: resultado})
    }

    render() {
      return (
        <div>
            <label>Número:</label>
            <input type="text" value={this.state.numero1} 
            onChange={(e) => this.setState({numero1: e.target.value})} /><br></br>
            <input type="text" value={this.state.numero2} 
            onChange={(e) => this.setState({numero2: e.target.value})} />
            
            <button 
            onClick={this.somar}>Somar</button><br></br>

            O resultado é: {this.state.resultado}
        </div>
      )
    }
}


export default App
