import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9dEB0351994821cF957bA9Cb928143aB33C0b76c'
);

export default instance;