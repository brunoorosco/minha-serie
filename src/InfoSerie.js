import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

const InfoSerie = ({match}) => {
   
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('INFO')
    const [form, setForm] = useState({
        name:''
    })
    const [genres, setGenres] = useState({})
    const [genreId, setGenreId] = useState('')

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    useEffect(() =>{
        axios.get('/api/series/'+ match.params.id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })
    },[match.params.id])

    useEffect(() =>{
        axios.get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
            const genres = res.data.data
            const encontrado = genres.find(value => data.genre === value.name)
            if(encontrado){
                        setGenreId(encontrado.id)
                }
            })
    },[data])

    //customização do header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundPosition : 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    
    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
       
    }

    const save = () => {
        axios.put('/api/series/'+ match.params.id,{
         ...form,
         genre: genreId
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success){  //se tiver sucesso redireciona usuario
         return(   <Redirect to='/series'/>)
    }
    return(
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}/>
                            </div>
                            <div className='col-8'>
                                    <h1 className='font-weight-light text-white'>{data.name}</h1>
                                    <div className='lead text-white'>
                                        { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                        { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para Assistir</Badge>}
                                        Gênero: {data.genre}
                                   </div>
                             </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <button className='btn btn-info' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            { mode ==='EDIT' &&
            <div className='container'>
                <h1>Informações da Série</h1>
                <pre>{JSON.stringify(form)}</pre>
                <button className='btn btn-dark' onClick={() => setMode('INFO')}>Cancelar Edição</button>
                 <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Série</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nova Serie'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentário</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comentários'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Gêneros</label>
                            <select className='form-control' onChange={onChange('genre_id')} defaultValue={genreId} >
                            {     genres.map(genre => <option key={genre.id} value={genre.id}> {genre.name} </option>
                                    )}
                             </select>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input' type='radio' name='status'id='assistir' checked={form.status === 'ASSISTIDO'} value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
                            <label className='form-check-label' htmlFor='assistir'>
                                Assistido
                            </label>
                        </div>
                         <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='paraAssistir'  checked={form.status === 'PARA_ASSISTIR'} value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')}/>
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para Assistir
                            </label>
                        </div>


                    <button type='button' onClick={save} className='btn btn-primary'>Salvar Série</button>
                </form>
            </div>
             }
        </div>
       
    )
}

export default InfoSerie