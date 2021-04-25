import {Box, Button, Container, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


export default function Auth() {
    return (
        <Box mt={4}>
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Facebook
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Twitter
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Google
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
