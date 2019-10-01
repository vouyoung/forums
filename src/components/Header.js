import React from 'react'
import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core'

const styles = {
    flex: {
        flex: 1,
    },
}

const AppHeader = props => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h4" color="inherit">
                Alpha Forums
            </Typography>

            {props.channels.map((ch, i) => {
                return (
                    <Button
                        key={`channel-${ch.id}-${i}`}
                        color={`${props.channel && props.channel.id === ch.id ? 'default' : 'inherit'}`}
                        onClick={() => props.setChannel(ch)}
                    >
                        {ch.name}
                    </Button>
                )
            })}
            <div className={props.classes.flex} />
        </Toolbar>
    </AppBar>
)

export default withStyles(styles)(AppHeader)
