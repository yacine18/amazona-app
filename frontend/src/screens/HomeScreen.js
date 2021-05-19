import React, {  useEffect } from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions'



const HomeScreen = () => {
    
   const productList = useSelector(state => state.productList)
   const dispatch = useDispatch()
   const { loading, products, error } = productList
    useEffect(() => {
       dispatch(listProducts())
    }, [dispatch])
    return (
        <div className="row center">
            {
                loading ? <LoadingBox />
                    : error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            {
                                products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))
                            }
                        </>
            }
        </div>
    )
}

export default HomeScreen
