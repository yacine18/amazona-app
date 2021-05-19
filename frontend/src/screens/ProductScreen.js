import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/productActions';

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const [qty, setQty] = useState(1)
    const { loading, error, product } = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div className="row center">
            {
                loading ? <LoadingBox />
                    : error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            <div className="row top">
                                <Link to="/">Back to result</Link>
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name} />
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{product.name}</h1>
                                        </li>
                                        <li>
                                            <Rating rating={product.rating} numReviews={product.numReviews} />
                                        </li>
                                        <li>
                                            Price: ${product.price}
                                        </li>
                                        <li>
                                            Description:
                     <p>{product.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price </div>
                                                    <div className="price"> ${product.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status: </div>
                                                    <div>
                                                        {
                                                            product.countStock > 0 ? <span className="success">In Stock</span>
                                                                : <span className="danger">Unavailable</span>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                product.countStock > 0 && (
                                                    <>
                                                    <li>
                                                        <div className="row">
                                                            <div>QTY</div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countStock).keys()].map(x=>{
                                                                        return(
                                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                                        )
                                                                        
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Add To Cart</button>
                                                        </li>
                                                    </>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>

    )
}

export default ProductScreen
