/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, Fragment } from 'react'
import { CssBaseline, withStyles } from '@material-ui/core'
import axios from 'axios'
import Header from './components/Header'
import Posts from './views/Posts'
import ModalEditor from './components/ModalEditor'

const styles = theme => ({
    main: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
        },
    },
})
const API = process.env.REACT_APP_API || 'http://localhost:3001'
const App = ({ classes }) => {
    const initState = {
        loading: true,
        channels: [],
        posts: [],
        current_channel: null,
        error: null,
        modal: false,
        postId: null,
    }
    const [state, setState] = useReducer((state, newState) => {
        return { ...state, ...newState }
    }, initState)

    const fetchData = (method, endpoint, data) => {
        axios({
            method: method,
            url: `${API}${endpoint}`,
            data: data && JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
        })
            .then(res => {
                // handle success
                if (res.status === 200 || res.status === 201) {
                    console.log('response', method, endpoint, res)
                    if (endpoint === '/channels') {
                        setState({ loading: false, modal: false, channels: res.data })
                        return
                    }
                    if (method === 'get') setState({ loading: false, modal: false, posts: res.data })
                    else getPosts(state.current_channel.id)
                }
            })
            .catch(err => {
                // handle error
                console.log(err)
            })
    }

    const getChannels = () => {
        fetchData('get', '/channels')
    }

    const getPosts = channel_id => {
        if (channel_id) fetchData('get', `/messages?channel_id=${channel_id}`)
        else fetchData('get', '/messages')
    }

    const savePost = post => {
        console.log('savePost start', post)
        if (post.id) fetchData('put', `/messages/${post.id}`, post)
        else fetchData('post', '/messages', post)
    }

    const deletePost = post => {
        if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
            fetchData('delete', `/messages/${post.id}`)
        }
    }

    const toggleModal = () => {
        const prev = state.modal
        setState({ ...state, modal: !prev })
    }

    const setChannel = ch => {
        setState({ ...state, current_channel: ch })
        getPosts(ch.id)
    }

    useEffect(() => {
        getChannels()
    }, [])

    // useEffect(() => {
    //     console.log('state.posts', state.posts)
    // }, [state.posts])

    return (
        <Fragment>
            <CssBaseline />
            <Header channels={state.channels} channel={state.current_channel} setChannel={setChannel} />
            <main className={classes.main}>
                <Posts
                    posts={state.posts}
                    loading={state.loading}
                    deletePost={deletePost}
                    toggleModal={toggleModal}
                    channel={state.current_channel}
                />
                {state.modal ? (
                    <ModalEditor
                        post={{ channel_id: state.current_channel.id }}
                        channels={state.channels}
                        toggleModal={toggleModal}
                        onSave={savePost}
                    />
                ) : (
                    ''
                )}
            </main>
        </Fragment>
    )
}

export default withStyles(styles)(App)
