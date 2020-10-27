import React, { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import TextField from '../../components/TextField'
import axios from '../../utils/axios'
require('dotenv').config()

export default () => {
  const initForm: { email: string; password: string } = {
    email: '',
    password: '',
  }
  const [form, setForm] = useState(initForm)

  const initMessage: string = ''
  const [message, setMessage] = useState(initMessage)

  const onChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const onSubmit = () => {
    axios
      .post('/login', form)
      .then(res => res.data)
      .then(data => {
        console.log(data)

        displayMessage(data.message)

        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const displayMessage = (msg: string) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <Card>
      {message !== '' && <Card width='100%'>{message}</Card>}
      <TextField
        value={form.email}
        type='text'
        onChange={onChange}
        name='email'
        placeholder='email'
      />
      <TextField
        value={form.password}
        type='password'
        onChange={onChange}
        name='password'
        placeholder='password'
      />
      <Button onClick={onSubmit}>Login</Button>
    </Card>
  )
}
