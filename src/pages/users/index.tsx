import React, { Fragment, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import axios from '../../utils/axios'
import User from '../../interfaces/user'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'

export default () => {
  const [loading, setLoading] = useState(true)

  const initUsers: User[] = []
  const [users, setUsers] = useState(initUsers)

  const initForm: { email: string; password: string } = {
    email: '',
    password: '',
  }
  const [form, setForm] = useState(initForm)
  const [formState, setFormState] = useState('')

  const [modal, setModal] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [error, setError] = useState('')

  if (localStorage.getItem('token') && localStorage.getItem('id')) {
    axios.defaults.headers.token = localStorage.getItem('token')
    axios.defaults.headers.id = localStorage.getItem('id')
  }

  useEffect(() => {
    fetchUsers()
    setLoading(false)
  }, [loading])

  const fetchUsers = () => {
    axios.get('/users').then(res => {
      if (res.data.error) {
        console.error(res.data.error)
        setError(res.data.error)
        setModal('error')
      } else {
        setUsers(res.data.data)
      }
    })
  }

  const onUserAdd = () => {
    setModal('form')
    setForm(initForm)
    setFormState('add')
  }

  const onUserAddConfirm = () => {
    axios.post('/users', form).then(res => {
      if (res.data.error) {
        console.error(res.data.error)
        setError(res.data.error)
        setModal('error')
      } else {
        onModalClose()
      }
    })
  }

  const onUserEdit = (id: string) => {
    axios.get(`/users/${id}`).then(res => {
      if (res.data.error) {
        console.error(res.data.error)
        setError(res.data.error)
        setModal('error')
      } else {
        setForm({...initForm, email: res.data.data.email})
        setModal('form')
        setFormState('edit')
        setSelectedUser(id)
      }
    })
  }

  const onUserEditConfirm = () => {
    axios.put(`/users/${selectedUser}`, form).then(res => {
      if (res.data.error) {
        console.error(res.data.error)
        setError(res.data.error)
        setModal('error')
      } else {
        onModalClose()
      }
    })
  }

  const onUserRemove = (id: string) => {
    setSelectedUser(id)
    setModal('confirmDelete')
  }

  const onUserRemoveConfirm = () => {
    axios
      .delete(`/users/${selectedUser}`)
      .then(res => {
        if (res.data.error) {
          console.error(res.data.error)
          setError(res.data.error)
          setModal('error')
        } else {
          fetchUsers()
          onModalClose()
        }
      })
      .catch(err => console.log(err))
  }

  const onFormChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const onModalClose = () => {
    setModal('')
    setForm(initForm)
    setFormState('')
  }

  return (
    <Fragment>
      {users &&
        users.map((e, i) => (
          <Card key={i}>
            {e.email}
            <br />
            {e.id}
            <br />
            {e.saldo}
            <br />
            <Button onClick={() => onUserEdit(e.id)}>Edit</Button>
            <Button onClick={() => onUserRemove(e.id)}>Delete</Button>
          </Card>
        ))}
      <Card>
        <Button onClick={onUserAdd}>Add</Button>
      </Card>
      <Modal c onClose={onModalClose} name='form' active={modal}>
        <TextField
          onChange={onFormChange}
          placeholder='email'
          type='email'
          name='email'
          value={form.email}
        />
        <TextField
          onChange={onFormChange}
          placeholder='password'
          type='password'
          name='password'
          value={form.password}
        />
        {formState === 'add' && (
          <Button onClick={onUserAddConfirm}>Confirm</Button>
        )}
        {formState === 'edit' && (
          <Button onClick={onUserEditConfirm}>Confirm</Button>
        )}
      </Modal>
      {/* <Modal c onClose={onModalClose} name='confirmDelete' active={modal}>
        Delete admin?
        <Button onClick={onUserRemoveConfirm}>Confirm</Button>
      </Modal>
      <Modal name='error' active={modal}>
        <Card>{error}</Card>
        <Button onClick={onModalClose}>OK</Button>
      </Modal> */}
    </Fragment>
  )
}
