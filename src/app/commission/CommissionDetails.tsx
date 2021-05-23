import {
    Box,
    Button,
    Checkbox,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Theme
} from "@material-ui/core";
import {useAppDispatch} from "../hooks";
import {Commission} from "../../domain/commission/model/commission";
import React from "react";
import AuthImage from "../component/AuthImage";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        sampleImg: {
            maxWidth: '33%'
        },
    }),
);

interface Props {
    commission: Commission
    open: boolean
    onClose: () => void
}

export default function CommissionDetail({commission, open, onClose, ...props}: Props) {
    const classes = useStyles();

    const dispatch = useAppDispatch()

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                委托資料
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="委托編號"
                            secondary={commission.id}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="開放委托編號"
                            secondary={commission.openCommissionId}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="繪師"
                            secondary={`${commission.artistName}@${commission.artistId}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="委托人"
                            secondary={`${commission.requesterName}@${commission.requesterId}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="詳細內容"
                                      secondary={commission.desc}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="參考"
                                      secondary={
                                          <Box display="flex" width="100%">
                                              {commission.refImagePaths.map((path, index) => (
                                                  <div className={classes.sampleImg} key={index}>
                                                      <AuthImage
                                                          src={`http://192.168.64.12:31398/${path}`}
                                                          alt="範例"/>
                                                  </div>
                                              ))}
                                          </Box>
                                      }/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="期限"
                                      secondary={`${commission.dayNeed}日`}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="付款方式"
                                      secondary={commission.paymentMethod}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="詳細內容"
                                      secondary={commission.desc}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="尺吋 (闊 x 高)"
                                      secondary={
                                          commission.size
                                              ? `${commission.size.width} x ${commission.size.height} ${commission.size.unit}`
                                              : "未指定"
                                      }/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="解析度"
                                      secondary={
                                          commission.resolution
                                              ? `${commission.resolution} ppi`
                                              : "未指定"
                                      }/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="輸出格式"
                                      secondary={
                                          commission.exportFormat
                                              ? `${commission.exportFormat}`
                                              : "未指定"
                                      }/>
                    </ListItem>
                    {
                        commission.bePrivate &&
                        <ListItem>
                            <Checkbox
                                checked={commission.isR18}
                                name="isR18"
                                color="default"
                                disabled
                            />
                            <p>成人向委托</p>
                        </ListItem>
                    }
                    {
                        commission.bePrivate &&
                        <ListItem>
                            <Checkbox
                                checked={commission.bePrivate}
                                name="bePrivate"
                                color="default"
                            />
                            <p>不公開完成品</p>
                        </ListItem>
                    }
                    {
                        commission.bePrivate &&
                        <ListItem>
                            <Checkbox
                                checked={commission.anonymous}
                                name="anonymous"
                                color="default"
                            />
                            <p>匿名委托</p>
                        </ListItem>
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="default" onClick={onClose} fullWidth>
                    確定
                </Button>
            </DialogActions>
        </Dialog>
    )
}
