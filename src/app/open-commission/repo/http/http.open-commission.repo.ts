import {AddOpenCommissionRepoModel, AddOpenCommissionRepoModelMapper} from './model/add-open-commission.repo.model';
import {GetOpenCommissionsRepoModel, GetOpenCommissionsRepoModelMapper} from './model/get-open-commissions.repo.model';
import {injectable} from "inversify";
import {OpenCommissionRepo} from "../../../../domain/open-commission/open-commission.repo";
import {OpenCommission} from "../../../../domain/open-commission/model/open-commission";
import {OpenCommissionFilter} from "../../../../domain/open-commission/model/open-commission-filter";
import axios from "axios";
import {OpenCommissionCreator} from "../../../../domain/open-commission/model/open-commission-creator";
import {OpenCommissionUpdater} from "../../../../domain/open-commission/model/open-commission-updater";
import GetOpenCommissionsResult from "../../../../domain/open-commission/model/get-open-commissions-result";
import config from "../../../config";

@injectable()
export class HttpOpenCommissionRepo implements OpenCommissionRepo {

    apiPath = config.API_PATH;

    addOpenCommissionRepoModelMapper = new AddOpenCommissionRepoModelMapper();
    getOpenCommissionsRepoModelMapper = new GetOpenCommissionsRepoModelMapper();

    getOpenCommission(token: string | null, openCommId: string): Promise<OpenCommission> {
        throw Error
    }

    getOpenCommissions(filter: OpenCommissionFilter): Promise<GetOpenCommissionsResult> {

        const params = {
            count: filter.count,
            offset: filter.offset
        }

        return axios
            .get<GetOpenCommissionsRepoModel>(
                `${this.apiPath}/artists/${filter.artistId}/open-commissions`,
                {params},
            )
            .then(resp => {
                return this.getOpenCommissionsRepoModelMapper.mapFrom(resp.data)
            })
    }

    getOpenCommissionsDetailsForArtist(token: string, artistId: string): Promise<GetOpenCommissionsResult> {
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        return axios
            .get<GetOpenCommissionsRepoModel>(`${this.apiPath}/artists/${artistId}/open-commissions/details`, {
                headers
            })
            .then(resp => {
                return this.getOpenCommissionsRepoModelMapper.mapFrom(resp.data)
            })
    }

    addOpenCommission(token: string, artistId: string, openCommCreator: OpenCommissionCreator): Promise<string> {
        const formData: any = new FormData();
        formData.append('title', openCommCreator.title);
        formData.append('desc', openCommCreator.desc);
        formData.append('dayNeed.from', openCommCreator.dayNeed.from);
        formData.append('dayNeed.to', openCommCreator.dayNeed.to);
        formData.append('isR18', openCommCreator.isR18);
        formData.append('allowBePrivate', openCommCreator.allowBePrivate);
        formData.append('allowAnonymous', openCommCreator.allowAnonymous);
        if (openCommCreator.depositRule) {
            formData.append('depositRule', openCommCreator.depositRule);
        }
        if (openCommCreator.price) {
            formData.append('price.amount', openCommCreator.price.amount);
            formData.append('price.currency', openCommCreator.price.currency);
        }
        if (openCommCreator.timesAllowedDraftToChange) {
            formData.append('timesAllowedDraftToChange', openCommCreator.timesAllowedDraftToChange);
        }
        if (openCommCreator.timesAllowedCompletionToChange) {
            formData.append('timesAllowedCompletionToChange', openCommCreator.timesAllowedCompletionToChange);
        }
        openCommCreator.sampleImages.forEach(file => {
            formData.append('sampleImages', file);
        });

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        return axios
            .post<AddOpenCommissionRepoModel>(`${this.apiPath}/artists/${artistId}/open-commissions`, formData, {
                headers
            })
            .then(resp => {
                return this.addOpenCommissionRepoModelMapper.mapFrom(resp.data)
            })
    }

    deleteOpenCommission(token: string, OpenCommId: string): Promise<string> {
        throw Error
    }

    updateOpenCommission(token: string, openCommUpdater: OpenCommissionUpdater): Promise<string> {
        throw Error
    }

}
