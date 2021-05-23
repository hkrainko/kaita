import {Observable} from 'rxjs';
import {CommissionDecisionMaking} from "../../../../../domain/commission/model/commission-decision";

// export class CommissionCommonDecision implements CommissionDecisionMaking {
//   optName: string;
//   title: string;
//   desc: string;
//   path: string;
//   make: () => Observable<string>;
//
//   constructor(optName: string, title: string, desc: string, path: string, make: () => Observable<string>) {
//     this.optName = optName;
//     this.title = title;
//     this.desc = desc;
//     this.path = path;
//     this.make = make;
//   }
// }

export class ArtistAcceptCommissionDecision implements CommissionDecisionMaking {
  optName = '接受';
  title = '接受委托';
  desc = '委托將馬上開始，需根據限期內完成委托內容。';
  path = 'artist-accept';
  make: () => Observable<string>;

  constructor(make: () => Observable<string>) {
    this.make = make;
  }
}

export class ArtistDeclineCommissionDecision implements CommissionDecisionMaking {
  optName = '拒絕';
  title = '拒絕委托';
  desc = '拒絕後將不能恢復。';
  path = 'artist-decline';
  make: () => Observable<string>;

  constructor(make: () => Observable<string>) {
    this.make = make;
  }
}

export class RequesterCancelCommissionDecision implements CommissionDecisionMaking {
  optName = '取消';
  title = '取消委托';
  desc = '取消委托後將不能恢復。';
  path = 'requester-cancel';
  make: () => Observable<string>;

  constructor(make: () => Observable<string>) {
    this.make = make;
  }
}

export class RequesterRequestRevisionCommissionDecision implements CommissionDecisionMaking {
  optName = '提出修改';
  title = '提出修改';
  desc = '提出修改後繪師將會重新繪制。';
  path = 'request-revision';
  make: () => Observable<string>;

  constructor(make: () => Observable<string>) {
    this.make = make;
  }
}

export class RequesterAcceptProofCopyCommissionDecision implements CommissionDecisionMaking {
  optName = '接受';
  title = '接受完稿。';
  desc = '接受完稿後繪師將繪制完成品。';
  path = 'accept-proof-copy';
  make: () => Observable<string>;

  constructor(make: () => Observable<string>) {
    this.make = make;
  }
}
