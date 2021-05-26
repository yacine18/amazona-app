import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sellerName, setSellerName] = useState('')
    const [sellerLogo, setSellerLogo] = useState('')
    const [sellerDescription, setSellerDescription] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            if (user.seller) {
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setSellerDescription(user.seller.description)
            }
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Password and Confirm Password are not matched')
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password,
                sellerName,
                sellerLogo,
                sellerDescription
            }))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        : error ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    {loadingUpdate && <LoadingBox></LoadingBox>}
                                    {errorUpdate &&
                                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                    }
                                    {successUpdate && (
                                        <MessageBox variant="success">
                                            Profile Updated Successfully
                                        </MessageBox>
                                    )}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Enter Password"
                                            onChange={e => setPassword(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            placeholder="Enter Confirm Password"
                                            onChange={e => setConfirmPassword(e.target.value)}></input>
                                    </div>
                                    {
                                        userInfo.isSeller && (
                                            <>
                                                <h2>Seller</h2>
                                                <div>
                                                    <label htmlFor="sellerName">Seller Name</label>
                                                    <input
                                                        type="text"
                                                        id="sellerName"
                                                        value={sellerName}
                                                        placeholder="Enter Seller Name"
                                                        onChange={e => setSellerName(e.target.value)}
                                                    >
                                                    </input>
                                                </div>
                                                <div>
                                                    <label htmlFor="sellerLogo">Seller Logo</label>
                                                    <input
                                                        type="text"
                                                        id="sellerLogo"
                                                        value={sellerLogo}
                                                        placeholder="Enter Seller Logo"
                                                        onChange={e => setSellerLogo(e.target.value)}
                                                    >
                                                    </input>
                                                </div>
                                                <div>
                                                    <label htmlFor="sellerDescription">Seller Description</label>
                                                    <input
                                                        type="text"
                                                        id="sellerDescription"
                                                        value={sellerDescription}
                                                        placeholder="Enter Seller Description"
                                                        onChange={e => setSellerDescription(e.target.value)}
                                                    >
                                                    </input>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">Update Profile</button>
                                    </div>
                                </>
                            )

                }
            </form>
        </div>
    )
}

export default ProfileScreen
