import React, {useState} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios.post('/api/genres/',{
            name
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success){  //se tiver sucesso redireciona usuario
         return(   <Redirect to='/genero'/>)
    }
    return(
        <div className='container'>
            <h1>Novo Gênero</h1>
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

export default NovoGenero