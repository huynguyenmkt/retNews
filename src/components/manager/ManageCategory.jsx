import React, { useEffect, useState } from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid'
import {
  editCategory,
  getAllCategory,
  createCategory,
  deleteCategory,
} from '../../services/categoryService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const columns = [
  { field: 'idCategory', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Tên thể loại', width: 250, editable: true },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
]
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{ utf8WithBom: true, delimiter: '   ' }}
        printOptions={{ allColumns: true }}
      />
    </GridToolbarContainer>
  )
}

function ManageCategory(props) {
  const user = useSelector((state) => state.user)
  const [listCategory, setListCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [open, setOpen] = React.useState(false)
  const [inputNewCategory, setInputNewCategory] = useState('')
  const [refresh, setRefresh] = useState(false)
  const isDeleteCategory = selectedCategory.length > 0
  const rows = listCategory.map((category) => ({
    ...category,
    id: category.idCategory,
  }))
  //   console.log(listCategory)
  const getCategorys = async () => {
    const data = await getAllCategory()
    if (data.result) {
      setListCategory(data.data)
    }
  }
  const changeCategory = async (id, title) => {
    const data = await editCategory(id, user.dataToken, title)
    if (data.result) {
      toast.success(`[id: ${id}]: ${data.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(`[id: ${id}]: ${data.message}`, {
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
  const addCategory = async (title) => {
    const data = await createCategory(user.dataToken, title)
    if (data.result) {
      toast.success(`${data.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(`${data.message}`, {
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
  const removeCategory = async (id) => {
    const data = await deleteCategory(id, user.dataToken)
    if (data.result) {
      toast.success(`[id: ${id}]: ${data.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(`[id: ${id}]: ${data.message}`, {
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
    getCategorys()
  }, [refresh])

  //handle
  const handleClickDelCategory = () => {
    for (let id of selectedCategory) {
      removeCategory(id)
    }
    setSelectedCategory([])
    setRefresh(!refresh)
  }
  const hanldeClickAddCategory = () => {
    addCategory(inputNewCategory)
    setInputNewCategory('')
    handleClose()
    setRefresh(!refresh)
  }
  const handleChangeSelectedCategory = (values) => {
    setSelectedCategory(values)
  }
  const handleEditCategory = (value) => {
    changeCategory(value.id, value.value)
    // getCategorys()
    console.log(value)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleChangeInputNewCategory = (e) => {
    setInputNewCategory(e.target.value)
  }
  return (
    <div
      style={{ height: 600, width: '100%', margin: 'auto', maxWidth: '570px' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        onSelectionModelChange={handleChangeSelectedCategory}
        onCellEditCommit={handleEditCategory}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      {isDeleteCategory ? (
        <Tooltip title="Xóa thể loại" placement="top-start">
          <Fab
            color="error"
            aria-label="edit"
            sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
            onClick={handleClickDelCategory}
          >
            <DeleteForeverIcon />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Thêm thể loại" placement="top-start">
          <Fab
            color="error"
            aria-label="edit"
            sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
            onClick={handleClickOpen}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập tên của thể loại:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên thể loại:"
            fullWidth
            variant="standard"
            autoComplete="off"
            value={inputNewCategory}
            onChange={handleChangeInputNewCategory}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={hanldeClickAddCategory}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ManageCategory
