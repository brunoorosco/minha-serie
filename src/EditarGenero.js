import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

const EditarGenero = ({match}) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() =>{
        axios.get('/api/genres/'+ match.params.id)
        .then(res => {
            setName(res.data.name)
        })
    },[match.params.id])
  

    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios.put('/api/genres/'+match.params.id,{
            name
        })
        .then(res => {
            setSuccess(true)
            console.log(res)
        })
    }
    if (success){  //se tiver sucesso redireciona usuario
         return(   <Redirect to='/genero'/>)
    }
    return(
        <div className='container'>
            <h1>Editar Gênero</h1>
            <form>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlfor='inputEmail4'>Gênero</label>
                        <input type='name' value={name} onChange={onChange} className='form-control' id='inputEmail4' placeholder='Novo Gênero'></input>
                    </div>
                 </div>  
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar Gênero</button>
            </form>


        </div>

    )
}

export default EditarGenero