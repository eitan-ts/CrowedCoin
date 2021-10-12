import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class CampaignShow extends Component {
    static async getInitialProps(props) {
       const campaign = Campaign(props.query.address)
       const summary = await campaign.methods.getSummery().call()

        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
    }

    renderCards(){
        const { 
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager has created this campaign and can make requests to withdraw money.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much to become approver.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'The number of people who are able approve a withdraw from the contract. A majority is required for a successful withdraw',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'The amount of money invested in the project (ether)',
                description: 'The balance of the contract is the amount of money that is currently invested in the project',
                style: { overflowWrap: 'break-word'}
            },
        ]

        return <Card.Group items = {items} />
    }

    render(){
        return(
        <Layout>     
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>  
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </Layout>
        )
    }
}

export default CampaignShow 