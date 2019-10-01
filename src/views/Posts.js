/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, Fragment } from 'react'
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core'
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons'
import moment from 'moment'
import { orderBy } from 'lodash'
import { compose } from 'recompose'

const styles = theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    posts: {
        marginTop: theme.spacing(2),
    },
    timestamp: { marginRight: theme.spacing(2), fontSize: '12px' },
    add: {
        display: 'inline-flex',
    },
})

const Posts = props => {
    return (
        <Fragment>
            {props.channel ? (
                <Typography variant="h4" className={props.classes.header}>
                    <span>{props.channel ? props.channel.name : ''} Posts</span>
                    <Button
                        variant="contained"
                        color="secondary"
                        aria-label="add"
                        className={props.classes.add}
                        onClick={props.toggleModal}
                    >
                        <AddIcon />
                    </Button>
                </Typography>
            ) : (
                <Typography variant="h4" className={props.classes.header}>
                    Select a Channel
                </Typography>
            )}
            {props.posts.length > 0 ? (
                <Paper elevation={1} className={props.classes.posts}>
                    <List>
                        {orderBy(props.posts, ['updatedAt', 'title'], ['desc', 'asc']).map(post => (
                            <ListItem key={post.id} button>
                                <ListItemText primary={post.title} secondary={post.body} />
                                <span className={props.classes.timestamp}>
                                    {post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
                                </span>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => props.deletePost(post)} color="inherit">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                !props.loading && props.channel && <Typography variant="subtitle1">No posts to display</Typography>
            )}
        </Fragment>
    )
}

export default compose(withStyles(styles))(Posts)
