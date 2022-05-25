import React from 'react'
import ArticleSlider from '../../components/popularNewsBody/ArticleSlider'
import PopularPost from '../../components/popularNewsBody/PopularPost'
import NewsHeaader from '../../components/popularNewsHeader/NewsHeaader'
import './Home.css'

function Home() {
  return (
    <>
      <NewsHeaader />
      <ArticleSlider />
      <PopularPost />
    </>
  )
}

export default Home
