import {createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(5),
        },
    }),
);

interface Props extends StandardProps<any, any> {

}

export default function Search(props: Props) {

    return (
        <div>123</div>
    )
}
