import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import {
  editRole,
  getAllUser,
  lockAccount,
  singup,
} from '../../services/userService'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{ utf8WithBom: true, delimiter: ',    ' }}
        printOptions={{ allColumns: true }}
      />
    </GridToolbarContainer>
  )
}
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Tên người dùng', width: 230 },
  {
    field: 'gender',
    headerName: 'Giới tính',
    type: 'number',
    width: 90,
  },
  { field: 'phone', headerName: 'Số điện thoại', width: 130 },
  { field: 'email', headerName: 'địa chỉ email', width: 230 },
  {
    field: 'role',
    headerName: 'Quyền',
    type: 'number',
    width: 90,
    editable: true,
  },
]

function ManageReader(props) {
  const user = useSelector((state) => state.user)
  const [listUser, setListUser] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [rePassword, setRePassword] = useState('')
  const [open, setOpen] = useState(false)
  const [listSelected, setListSelected] = useState([])
  const isDeleteUser = listSelected.length > 0
  const rows = listUser.map((user) => ({ ...user, id: user.idUser }))
  const [values, setValues] = useState({
    name: '',
    sex: 0,
    phone: '',
    email: '',
    avatar:
      'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326297/male-avatar-icon-6_b0eizy.jpg',
    userName: '',
    password: '',
    role: 2,
  })
  //get Data
  const getListUser = async () => {
    const response = await getAllUser()
    if (response.result) {
      setListUser(response.data)
    }
  }
  useEffect(() => {
    getListUser()
  }, [])

  //hanlde
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleEditRole = async (values) => {
    const newRole = values.value
    if (newRole > 2 || newRole < 0) {
      toast.error('Quyền không đúng!\nVui lòng chọn lại', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const idUser = values.row.idUser
      const response = await editRole(user.idUser, idUser, newRole)
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
        getListUser()
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
  }
  const handleChaneSelectedUser = (values) => {
    setListSelected(values)
  }
  const handleLockUser = async () => {
    for (let id of listSelected) {
      const response = await lockAccount(id, user.dataToken)
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
    getListUser()
  }
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleChangeRePassWord = (e) => {
    setRePassword(e.target.value)
  }
  const handleChange = (prop) => (event) => {
    if (prop === 'sex') {
      setValues({
        ...values,
        avatar: event.target.value
          ? 'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326281/download_1_cxgjnk.png'
          : 'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326297/male-avatar-icon-6_b0eizy.jpg',
        [prop]: event.target.value,
      })
    } else {
      setValues({ ...values, [prop]: event.target.value })
    }
  }
  //submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.password !== rePassword) {
      toast.error('mật khẩu và nhập lại không khớp!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const data = await singup(values)
      // console.log(data)
      if (data.result) {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        handleClose()
        getListUser()
      } else {
        toast.error(data.message, {
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
  }
  // end handle
  return (
    <div
      style={{ height: 600, width: '100%', margin: 'auto', maxWidth: '950px' }}
    >
      <Typography variant="caption" display="block" gutterBottom color="error">
        *Chỉnh sửa quyền của người dùng trực tiếp trên bảng bên dưới
      </Typography>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        onSelectionModelChange={handleChaneSelectedUser}
        onCellEditCommit={handleEditRole}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      {isDeleteUser ? (
        <Tooltip title="Khóa người dùng" placement="top-start">
          <Fab
            color="error"
            aria-label="edit"
            sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
            onClick={handleLockUser}
          >
            <DeleteForeverIcon />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Thêm người dùng mới" placement="top-start">
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
        <DialogTitle>Thêm mới người dùng</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="standard-basic"
              label="Tên của người dùng?"
              variant="standard"
              sx={{ m: 4 }}
              value={values.name}
              onChange={handleChange('name')}
              required
            />
            <FormControl sx={{ padding: '32px' }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={values.sex}
                onChange={handleChange('sex')}
                sx={{ justifyContent: 'space-around' }}
              >
                <FormControlLabel value="0" control={<Radio />} label="Nam" />
                <FormControlLabel value="1" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
            <TextField
              id="standard-basic2"
              label="Số điện thoại"
              variant="standard"
              sx={{ m: 4 }}
              value={values.phone}
              onChange={handleChange('phone')}
            />
            <TextField
              id="standard-basic3"
              label="Địa chỉ email"
              variant="standard"
              sx={{ m: 4 }}
              value={values.email}
              onChange={handleChange('email')}
              type="email"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="standard-basic4"
              label="Tên tài khoản"
              variant="standard"
              sx={{ m: 4 }}
              value={values.userName}
              onChange={handleChange('userName')}
              required
            />
            <FormControl sx={{ m: 4 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Mật khẩu
              </InputLabel>
              <Input
                required
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 4 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password2">
                Nhập lại Mật khẩu
              </InputLabel>
              <Input
                required
                id="standard-adornment-password2"
                type={showPassword ? 'text' : 'password'}
                value={rePassword}
                onChange={handleChangeRePassWord}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 4 }}>
              <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.role}
                label="Role"
                onChange={handleChange('role')}
              >
                <MenuItem value={0}>admin</MenuItem>
                <MenuItem value={1}>người viết</MenuItem>
                <MenuItem value={2}>người đọc</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Đăng ký</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ManageReader
