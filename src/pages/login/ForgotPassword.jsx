import { Box, Button, Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import { forgotPassword } from '../../services/userService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'

function ForgotPassword(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const handleGetPassword = async (email) => {
    const response = await forgotPassword(email)
    if (response.result) {
      toast.success(response.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setLoading(false)
      navigate('/login')
    } else {
      toast.error(response.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    handleGetPassword(email)
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          padding: 2,
          flexDirection: 'column',
          width: 0.9,
          border: '1px solid black',
        }}
        onSubmit={handleSubmit}
      >
        <h2>Lấy lại mật khẩu</h2>

        <TextField
          id="standard-basic"
          label="Địa chỉ email đã đăng ký với tài khoản của bạn: "
          variant="standard"
          sx={{ m: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <LoadingButton
          variant="contained"
          color="error"
          sx={{ m: 4, width: 0.5, alignSelf: 'center' }}
          type="submit"
          loading={loading}
        >
          Gửi
        </LoadingButton>
      </Box>
    </Container>
  )
}

export default ForgotPassword
