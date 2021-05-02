
import {Box, createStyles, makeStyles, StandardProps, Theme, WithStyles} from "@material-ui/core";
import {CommonProps, OverridableTypeMap} from "@material-ui/core/OverridableComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        banner: {
            high: 133
        }
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function ArtistBanner(props: Props)  {
    return (
        <Box className={props.className}>ss</Box>
    )
}
