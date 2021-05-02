import {Box, createStyles, Grid, makeStyles, StandardProps, Theme} from "@material-ui/core";
import ArtworkCard from "./ArtworkCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

interface Props extends StandardProps<any, any> {

}

export default function Artworks(props: Props) {

    const classes = useStyles(props.className)

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <ArtworkCard/>
            </Grid>
            <Grid item xs={6} md={4}>
                <ArtworkCard/>
            </Grid>
            <Grid item xs={6} md={4}>
                <ArtworkCard/>
            </Grid>
        </Grid>
    )

}
