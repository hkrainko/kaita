import {OpenCommission} from "./open-commission";

export default interface GetOpenCommissionsResult {
    openCommissions: OpenCommission[]
    offset: number
    count: number
    total: number
}
