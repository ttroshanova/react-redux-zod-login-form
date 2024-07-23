import React, { useState }  from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, TSignInSchema, AppDispatch } from '../types'
import { fetchData } from './tableSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { HiExclamationCircle } from 'react-icons/hi2'
import * as Fa from "react-icons/fa";

const Form = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const {
    handleSubmit,
    register,
    formState: {
      errors
    }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = () => {
    try {
      dispatch(fetchData())
    } catch(err) {
      console.error(err)
    }
    navigate('/table')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='username'{...register('username')}/>
      {errors?.username && (
        <div className='error-details'>
          <span><HiExclamationCircle /></span>
          <p>{`${errors.username.message}`}</p>
        </div>
      )}
      <div className='input-container'>
        <input type={visible ? 'text' : 'password'} placeholder='password'{...register('password')}/>
        <span className='isVisiblePassword' onClick={() => setVisible(!visible)}>
          {visible ? <Fa.FaRegEye /> : <Fa.FaRegEyeSlash /> }
        </span>
      </div>
      {errors?.password && (
        <div className='error-details'>
          <span><HiExclamationCircle /></span>
          <p>{`${errors.password.message}`}</p>
        </div>
      )}
      <button>Login</button>
    </form>
  )
}

export default Form