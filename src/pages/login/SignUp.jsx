import React, { useState } from 'react';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { toast } from 'react-toastify';
function SignUp(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [rePassword, setRePassword] = useState('')
  const [values, setValues] = useState({
    name: "",
    sex: false,
    phone: "",
    email: "",
    avatar: "",
    userName: "",
    password: "",
  });
  const handleChangeRePassWord = (e) =>{
      setRePassword(e.target.value)
  }
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== rePassword){
        toast.error('mật khẩu và nhập lại không khớp!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
        console.log("submiting..." + values);
        toast.success('đăng ký thành công!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        mb: 3
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          padding: 2,
          flexDirection: "column",
          width: 0.9,
          border: "1px solid black",
          height: 1
        }}
        onSubmit={handleSubmit}
      >
        <h2>Đăng Ký</h2>
        
        <TextField
          id="standard-basic"
          label="Tên của bạn?"
          variant="standard"
          sx={{ m: 4 }}
          value={values.name}
          onChange={handleChange("name")}
          required
        />
        <TextField
          id="standard-basic"
          label="Số điện thoại"
          variant="standard"
          sx={{ m: 4 }}
          value={values.phone}
          onChange={handleChange("phone")}
        />
        <TextField
          id="standard-basic"
          label="Địa chỉ email"
          variant="standard"
          sx={{ m: 4 }}
          value={values.email}
          onChange={handleChange("email")}
          type="email"
        />
        <TextField
          id="standard-basic"
          label="Tên tài khoản"
          variant="standard"
          sx={{ m: 4 }}
          value={values.userName}
          onChange={handleChange("userName")}
          required
        />
        <FormControl sx={{ m: 4 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Mật khẩu
          </InputLabel>
          <Input
            required
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
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
          <InputLabel htmlFor="standard-adornment-password">
            Nhập lại Mật khẩu
          </InputLabel>
          <Input
            required
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
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
        <Button
          variant="contained"
          color="error"
          sx={{ m: 4, width: 0.5, alignSelf: "center" }}
          type="submit"
        >
          Đăng ký
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;