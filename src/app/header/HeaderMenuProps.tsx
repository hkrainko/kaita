import {AuthUser} from "../../domain/auth-user/auth-user";

export default interface HeaderMenuProps {
    authUser: AuthUser,
    onClickCommission: () => void,
    onClickArtist: () => void,
    onClickUserProfile: () => void,
    onClickLogout: () => void,
}
