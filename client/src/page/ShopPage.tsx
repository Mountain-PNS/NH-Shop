import CategoriesList from '@/components/CategoriesList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import New from '@/components/New'
import React from 'react'

const ShopPage = () => {
  return (
    <>
    <CategoriesList/>
    <New featured={true}/>

    </>
  )
}

export default ShopPage