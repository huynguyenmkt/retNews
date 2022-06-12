import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { getAllArticles } from '../../services/articleService'
import { getAllCategory } from '../../services/categoryService'
import { getAllUser } from '../../services/userService'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
// const data3 = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ]
const COLORS = ['#fb7f4b', '#2b7cff']
function Report(props) {
  const [listArticle, setListArticle] = useState([])
  const [listUser, setListUser] = useState([])
  const [listCategory, setListCategory] = useState([])
  const data2 = [
    { name: 'Bài viết', Quantity: listArticle.length },
    { name: 'Người dùng', Quantity: listUser.length },
    { name: 'Thể loại', Quantity: listCategory.length },
  ]
  const [data, setData] = useState([])
  const [data3, setData3] = useState([])
  //get data
  const getListArticle = async () => {
    const response = await getAllArticles()
    if (response.result) {
      let newListArticle = response.data
      newListArticle = newListArticle.map((article) => {
        const dateSubmitted = new Date(article.dateSubmitted)
        const date =
          dateSubmitted.getMonth() + 1 + '/' + dateSubmitted.getFullYear()
        return { ...article, date }
      })
      setListArticle(newListArticle)
    }
  }
  const getListUser = async () => {
    const response = await getAllUser()
    if (response.result) {
      setListUser(response.data)
    }
  }
  const getListCategory = async () => {
    const response = await getAllCategory()
    if (response.result) {
      setListCategory(response.data)
    }
  }
  const summaryArticle = (listArticle) => {
    let summary = []
    for (const article of listArticle) {
      const index = summary.findIndex((item) => item.date === article.date)
      if (index > -1) {
        summary[index].sum += 1
        summary[index].views += article.views
      } else {
        summary.push({ date: article.date, sum: 1, views: article.views })
      }
    }
    setData(summary)
  }
  const summaryGenderUser = (listUser) => {
    let summary = [
      { gender: 0, sum: 0 },
      { gender: 1, sum: 0 },
    ]
    for (const user of listUser) {
      const index = summary.findIndex((item) => item.gender === user.gender)
      if (index > -1) {
        summary[index].sum += 1
      } else {
        summary.push({ gender: user.gender, sum: 1 })
      }
    }
    setData3(summary)
  }
  useEffect(() => {
    summaryGenderUser(listUser)
  }, [listUser])

  useEffect(() => {
    summaryArticle(listArticle)
  }, [listArticle])
  useEffect(() => {
    getListArticle()
    getListUser()
    getListCategory()
  }, [])
  // console.log(data)
  return (
    <div>
      <Box sx={{ width: 'fit-content', margin: 'auto' }}>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ textAlign: 'center' }}
        >
          Bảng thống kê thông số bài viết theo từng tháng
        </Typography>
        <ResponsiveContainer width={1100} height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sum"
              stroke="#ff0000"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#fba418"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '1100px',
          justifyContent: 'space-around',
          margin: 'auto',
        }}
      >
        <Box sx={{ width: 'fit-content' }}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ textAlign: 'center' }}
          >
            Bảng thống kê tổng số lượng
          </Typography>
          <ResponsiveContainer width={350} height={250}>
            <BarChart
              width={500}
              height={300}
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Quantity" fill="#0500d5" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ width: 'fit-content' }}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ textAlign: 'center' }}
          >
            Bảng tỉ lệ giới tính
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{
                display: 'flex',
                columnGap: '5px',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#fb7f4b',
                }}
              ></div>
              Nam
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{
                display: 'flex',
                columnGap: '5px',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#2b7cff',
                }}
              ></div>
              Nữ
            </Typography>
          </Typography>
          <ResponsiveContainer width={350} height={200}>
            <PieChart width={400} height={400}>
              <Pie
                data={data3}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sum"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </div>
  )
}

export default Report
