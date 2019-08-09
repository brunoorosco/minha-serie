import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Serie = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('api/series/').then(res => {
            setData(res.data.data)
        })
    })

const renderizaLinha = record => {
    return (
        <tr>
            <th scope='row'>{record.id}</th>
            <td>{record.name}</td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Excluir</button>
                <Link className='btn btn-warning' to = {'/series/' + record.id}>Info</Link>
            </td>
        </tr>
    )
}  

const deleteSerie = id => {
        axios.delete('api/series/'+ id).then(res => {
                console.log(res);
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
        })
}
    if(data.length === 0)
    {
        return(
                <div className='container'>
                    <h1>Serie</h1>
                    <Link className='btn btn-primary' to='/series/novo'>Nova Serie</Link>
                      <div className="alert alert-warning" role="alert">
                        Você não possui nenhuma serie
                    </div>
                   
                </div>            
        )
    }  
    return (
            <div className='container'>
                <h1>Séries</h1>
                <Link className='btn btn-primary' to='/series/novo'>Nova Serie</Link>
                <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ação</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map(renderizaLinha)}
                </tbody>
                </table>
            </div>
        )
  }

  export default Serie