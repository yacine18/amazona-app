import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUser } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = props => {
    const userId = props.match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, sucess: successUpdate } = userUpdate

    const dispatch = useDispatch()

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }))
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit User {name}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        placeholder="Enter Name"
                                        onChange={e => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        placeholder="Enter Email"
                                        onChange={e => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="isSeller">Is Seller</label>
                                    <input
                                        type="checkbox"
                                        id="isSeller"
                                        checked={isSeller}
                                        onChange={e => setIsSeller(e.target.checked)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="isAdmin">Is Admin</label>
                                    <input
                                        type="checkbox"
                                        id="isAdmin"
                                        checked={isAdmin}
                                        onChange={e => setIsAdmin(e.target.checked)}
                                    ></input>
                                </div>
                                <div>
                                    <label />
                                    <button type="submit" className="primary">Upldate User</button>
                                </div>
                            </>

                }
            </form>
        </div>
    )
}

export default UserEditScreen
