import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('api/genres/').then(res => {
            setData(res.data.data)
        })
    })

const renderizaLinha = record => {
    return (
        <tr>
            <th scope='row'>{record.id}</th>
            <td>{record.name}</td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Excluir</button>
                <Link className='btn btn-warning' to = {'/genero/' + record.id}>Editar</Link>
            </td>
        </tr>
    )
}  

const deleteGenero = id => {
        axios.delete('api/genres/'+ id).then(res => {
             //   console.log(res);
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
        })
}
    if(data.length === 0)
    {
        return(
                <div className='container'>
                    <h1>Gêneros</h1>
                    <Link className='btn btn-primary' to='/genero/novo'>Novo Gênero</Link>
                    <div className='alert alert-warning' role='alert'>
                        Você não possui nenhum gênero
                    </div>
                </div>            
        )
    }  
    return (
            <div className='container'>
                <h1>Gêneros</h1>
                <Link className='btn btn-primary' to='/genero/novo'>Novo gênero</Link>
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

  export default Generos