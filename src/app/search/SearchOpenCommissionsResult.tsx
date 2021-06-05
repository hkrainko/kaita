import {createStyles, makeStyles, StandardProps, Theme} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {useCallback} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

interface Props extends StandardProps<any, any> {

}

export default function SearchOpenCommissionsResult(props: Props) {

    const fetchData = useCallback(() => {

    }, [])

    return (
        <InfiniteScroll
            next={fetchData}
            hasMore={true}
            loader={<div>Loading</div>}
            dataLength={100}
        >
            <div>child</div>
        </InfiniteScroll>
    )
}
