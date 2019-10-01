/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withStyles, Card, CardContent, CardActions, Modal, Button, TextField } from '@material-ui/core'
import { compose } from 'recompose'
import { Form, Field } from 'react-final-form'

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 500,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(2),
    },
})

const ModalEditor = props => {
    const [post, setPost] = useState(props.post)

    useEffect(() => {
        //console.log('POST', post)
    }, [post])

    return (
        <Form initialValues={props.post} onSubmit={props.onSave}>
            {({ handleSubmit }) => (
                <Modal className={props.classes.modal} open>
                    <Card className={props.classes.modalCard}>
                        <form onSubmit={handleSubmit}>
                            <CardContent className={props.classes.modalCardContent}>
                                <Field name="title">
                                    {({ input }) => (
                                        <TextField
                                            label="Title"
                                            autoFocus
                                            {...input}
                                            onChange={e => {
                                                input.onChange(e)
                                                setPost({ ...post, title: e.target.value })
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="body">
                                    {({ input }) => (
                                        <TextField
                                            className={props.classes.marginTop}
                                            label="Body"
                                            multiline
                                            rows={4}
                                            {...input}
                                            onChange={e => {
                                                input.onChange(e)
                                                setPost({ ...post, body: e.target.value })
                                            }}
                                        />
                                    )}
                                </Field>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    type="submit"
                                    disabled={post.title && post.body ? false : true}
                                >
                                    Submit
                                </Button>
                                <Button size="small" onClick={props.toggleModal}>
                                    Cancel
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Modal>
            )}
        </Form>
    )
}
export default compose(withStyles(styles))(ModalEditor)
