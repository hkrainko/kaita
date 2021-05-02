import {List, ListItem, ListItemIcon, ListItemText, StandardProps} from "@material-ui/core";
import {InsertEmoticonRounded} from "@material-ui/icons";


interface Props extends StandardProps<any, any> {

}

export default function ArtistInfo(props: Props) {

    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <InsertEmoticonRounded />
                </ListItemIcon>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InsertEmoticonRounded />
                </ListItemIcon>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InsertEmoticonRounded />
                </ListItemIcon>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InsertEmoticonRounded />
                </ListItemIcon>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InsertEmoticonRounded />
                </ListItemIcon>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
        </List>
    )

}
