import React, { Fragment, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import axios from '../../utils/axios'
import Admin from '../../interfaces/admin'
import User from '../../interfaces/user'
import Modal from '../../components/Modal'

export default () => {
  const [loading, setLoading] = useState(true)

  const initAdmins: Admin[] = []
  const [admins, setAdmins] = useState(initAdmins)

  const initUsers: User[] = []
  const [users, setUsers] = useState(initUsers)

  const [modal, setModal] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [deleteAdmin, setDeleteAdmin] = useState('')
  const [error, setError] = useState('')

  if (localStorage.getItem('token') && localStorage.getItem('id')) {
    axios.defaults.headers.token = localStorage.getItem('token')
    axios.defaults.headers.id = localStorage.getItem('id')
  }

  useEffect(() => {
    fetchAdmins()
    setLoading(false)
  }, [loading])

  const fetchAdmins = () => {
    axios
      .get('/admins')
      .then(res => {
        if (res.data.error) {
          console.error(res.data.error)
          setError(res.data.error)
          setModal('error')
        } else {
          return res.data
        }
      })
      .then(data => {
        setAdmins(data.data)
      })
      .catch(err => {})
  }

  const onAdminAdd = () => {
    axios
      .get('/users')
      .then(res => {
        if (res.data.error) {
          console.error(res.data.error)
          setError(res.data.error)
          setModal('error')
        } else {
          return res.data
        }
      })
      .then(data => {
        setUsers(data.data)
        setModal('addAdmin')
      })
      .catch(err => {
        console.error(err)
      })
  }

  const onAdminAddConfirm = () => {
    axios
      .post('/admins', { id: selectedUser })
      .then(res => {
        if (res.data.error) {
          console.error(res.data.error)
          setError(res.data.error)
          setModal('error')
        } else {
          fetchAdmins()
          onModalClose()
        }
      })
      .catch(err => console.error(err))
  }

  const onAdminRemove = (id: string) => {
    setDeleteAdmin(id)
    setModal('confirmDelete')
  }

  const onAdminRemoveConfirm = () => {
    axios
      .delete(`/admins/${deleteAdmin}`)
      .then(res => {
        if (res.data.error) {
          console.error(res.data.error)
          setError(res.data.error)
          setModal('error')
        } else {
          fetchAdmins()
          onModalClose()
        }
      })
      .catch(err => console.log(err))
  }

  const onModalClose = () => {
    setModal('')
  }

  return (
    <Fragment>
      {admins &&
        admins.map((e, i) => (
          <Card key={i}>
            {e.email}
            <br />
            {e.id}
            <br />
            <Button onClick={() => onAdminRemove(e.id)}>Remove admin</Button>
          </Card>
        ))}
      <Card>
        <Button onClick={onAdminAdd}>Add</Button>
      </Card>
      <Modal c onClose={onModalClose} name='addAdmin' active={modal}>
        <select
          onChange={e => {
            setSelectedUser(e.target.value)
          }}
          value={selectedUser}
        >
          {users.map((e, i) => (
            <option key={i} value={e.id}>
              {e.email}
            </option>
          ))}
        </select>
        <Button onClick={onAdminAddConfirm}>Confirm</Button>
      </Modal>
      <Modal c onClose={onModalClose} name='confirmDelete' active={modal}>
        Delete admin?
        <Button onClick={onAdminRemoveConfirm}>Confirm</Button>
      </Modal>
      <Modal name='error' active={modal}>
        <Card>{error}</Card>
        <Button onClick={onModalClose}>OK</Button>
      </Modal>
    </Fragment>
  )
}
