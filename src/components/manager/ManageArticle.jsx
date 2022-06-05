import React, { useState } from 'react'

import {
  Box,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import TableArticles from './TableArticles'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import SaveArticle from './SaveArticle'
import { deleteArticle } from '../../services/articleService'
import { ResetTvOutlined } from '@mui/icons-material'
import { toast } from 'react-toastify'

function ManageArticle(props) {
  const [arena, setArena] = useState('table')
  const [selectedArticles, setSelectedArticles] = useState([])

  const isPermisssionEdit = selectedArticles.length === 1
  const isPermissionDel = selectedArticles.length >= 1
  // console.log(selectedArticles)
  //handle
  const handleChangeSelectedArticles = (values) => {
    setSelectedArticles(values)
  }
  const handleBack = () => {
    setSelectedArticles([])
    setArena('table')
  }
  const handleDeleteArticles = async () => {
    // for (let id of selectedArticles) {
    //   const data = await deleteArticle(id)
    //   if (data.result) {
    //     toast.success(data.message, {
    //       position: 'top-center',
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     })
    //   } else {
    //     toast.error(data.message, {
    //       position: 'top-center',
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     })
    //   }
    // }
    // setSelectedArticles([])
    const response = await deleteArticle(8)
    console.log(response)
  }
  return (
    <>
      {arena !== 'table' && (
        <IconButton
          color="error"
          aria-label="add to shopping cart"
          onClick={() => setArena('table')}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      )}
      {arena === 'table' && (
        <TableArticles onChangeSelected={handleChangeSelectedArticles} />
      )}
      {arena === 'add' && <SaveArticle onBack={handleBack} />}
      {arena === 'edit' && (
        <SaveArticle onBack={handleBack} idArticle={selectedArticles[0]} />
      )}
      <Box
        sx={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          transform: 'translateZ(0px)',
          flexGrow: 1,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          FabProps={{
            sx: {
              bgcolor: 'red',
              '&:hover': {
                bgcolor: '#a30000',
              },
            },
          }}
        >
          <SpeedDialAction
            key="add"
            icon={<BorderColorIcon color="error" />}
            tooltipTitle="Thêm bài viết"
            onClick={() => setArena('add')}
          />
          {isPermissionDel && (
            <SpeedDialAction
              key="delete"
              icon={<DeleteIcon color="error" />}
              tooltipTitle="Xóa bài viết"
              onClick={handleDeleteArticles}
            />
          )}
          {isPermisssionEdit && (
            <SpeedDialAction
              key="edit"
              icon={<AutoFixHighIcon color="error" />}
              tooltipTitle="Sửa bài viết"
              onClick={() => setArena('edit')}
            />
          )}
        </SpeedDial>
      </Box>
    </>
  )
}

export default ManageArticle
