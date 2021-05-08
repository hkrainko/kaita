import {OpenCommission} from "./open-commission";

export default interface GetOpenCommissionsResult {
    artistId: string
    openCommissions: OpenCommission[]
    offset: number
    fetchCount: number
    total: number
}
