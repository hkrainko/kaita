import {AuthUser} from "../../domain/auth-user/model/auth-user";

export default interface HeaderMenuProps {
    authUser: AuthUser
    onClickSubmittedCommission: () => void
    onClickReceivedCommission: () => void
    onClickArtist: () => void
    onClickUserProfile: () => void
    onClickLogout: () => void
}
