import { Box, Button, Container, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  deleteAllHistoryOfUser,
  getAllHistoryByIdUser,
} from '../../services/userService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
function compare(a, b) {
  const dateA = new Date(a.datetimeSeen)
  const dateB = new Date(b.datetimeSeen)
  if (dateA > dateB) {
    return -1
  }
  if (dateA < dateB) {
    return 1
  }
  return 0
}

function History(props) {
  const user = useSelector((state) => state.user)
  const [history, setHistory] = useState([])

  //get data
  const getHistory = async () => {
    const response = await getAllHistoryByIdUser(user.idUser, user.dataToken)
    if (response.result) {
      const data = response.data
      //   console.log(data)
      let newHistory = []
      for (const history of data) {
        const date = new Date(history.datetimeSeen)
        const newTime =
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds() +
          ' '
        const newDate =
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear()
        newHistory.push({ ...history, dateTime: newTime + newDate })
      }
      newHistory = newHistory.sort(compare)
      //   console.log(newHistory)

      setHistory(newHistory)
    }
  }
  const handleClearHistory = async () => {
    const response = await deleteAllHistoryOfUser(user.idUser)
    if (response.result) {
      toast.success(`${response.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      getHistory()
    } else {
      toast.error(`${response.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  useEffect(() => {
    getHistory()
  }, [])
  //   console.log(history)
  return (
    <Container maxWidth="lg" sx={{ marginTop: '90px', minHeight: '600px' }}>
      <Divider>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{ fontSize: '30px', fontWeight: 500 }}
        >
          Lịch sử
        </Typography>
      </Divider>
      {history.map((h, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            columnGap: '10px',
            alignItems: 'center',
            marginLeft: '20px',
            marginBottom: '10px',
          }}
        >
          <Typography variant="overline" display="block" gutterBottom>
            {`${h.dateTime}: `}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {h.title}
          </Typography>
        </Box>
      ))}
      {history.length > 0 && (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          sx={{ marginY: '30px', marginX: '20px' }}
          onClick={handleClearHistory}
        >
          Xóa lịch sử
        </Button>
      )}
    </Container>
  )
}

export default History
