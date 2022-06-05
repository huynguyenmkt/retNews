import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { getAllArticles } from '../../services/articleService'
import { toast } from 'react-toastify'
import { getUserById } from '../../services/userService'
const columns = [
  { field: 'idArticles', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Tiêu đề', width: 350 },
  { field: 'author', headerName: 'Tác giả', width: 250 },
  { field: 'date', headerName: 'Ngày tạo(yyyy/MM/dd)', width: 180 },
  { field: 'status', headerName: 'Trạng thái', width: 150 },
  {
    field: 'views',
    headerName: 'Lượt xem',
    type: 'number',
    width: 150,
  },
]
function TableArticles({ onChangeSelected }) {
  const [articles, setArticles] = useState([])

  const getArticles = async () => {
    const data = await getAllArticles()
    if (data.result) {
      const newArticles = []
      for (let article of data.data) {
        const user = await getUserById(article.idUser)
        newArticles.push({
          ...article,
          author: user.name,
          date: article.dateSubmitted.slice(0, 10),
        })
      }
      setArticles(newArticles)
    } else {
      toast.error('Lấy bài viết thất bại!', {
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
    getArticles()
  }, [])

  const rows = articles.map((article) => {
    // console.log(author)
    return { id: article.idArticles, ...article }
  })

  //   const handleChange = (values) => {
  //     setSelectedArticles(values)
  //   }
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        margin: 'auto',
        maxWidth: '1210px',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        onSelectionModelChange={onChangeSelected}
        checkboxSelection
      />
    </div>
  )
}

export default TableArticles
