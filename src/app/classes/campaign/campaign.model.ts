export class CampaignObject {
    constructor (
        public name: string,
        public email: string,
        public helper: string,
        public campaign: string,
        public discount?: string,
        public lang?: string
    ) {}
}
