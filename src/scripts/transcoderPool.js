import axios from 'axios'
import { request } from 'graphql-request'


import Web3 from "web3"
let web3 = new Web3(process.env.VUE_APP_GETH_URL)

export async function getTranscoders() {
        return formatTranscoders(
            (await axios.get(`${process.env.VUE_APP_LIVEPOOL_API}/transcoders`)).data
        )
}

function formatTranscoders(stats) {
    let transcoders = []
    for (let transcoder in stats) {
        transcoders.push({
            address: transcoder,
            pending: web3.utils.fromWei(stats[transcoder].Pending.toString(), 'ether').substring(0,8) + " Ξ",
            payout: web3.utils.fromWei(stats[transcoder].Payout.toString(), 'ether').substring(0,6) + " Ξ",
            capacity: stats[transcoder].Nodes.reduce((total, cap) => {
                total.Capacity += cap.Capacity
                return total
            }).Capacity,
            nodes: stats[transcoder].Nodes.map(t => t.Address)
        })
    }
    return transcoders
}

async function poolEarnings() {
    const query = `{
        winningTicketRedeemeds {
                hash
                faceValue
                recipient(where: {id: "0xf4e8Ef0763BCB2B1aF693F5970a00050a6aC7E1B"})
            }
        }`

    let data = await request(process.env.VUE_APP_LIVEPEER_SUBGRAPH, query)
        let earnings = data.winningTicketRedeemeds.reduce((a, b) => {
        let c = web3.utils.toBN(a.faceValue.toString()).add(web3.utils.toBN(b.faceValue.toString())).toString()
            return {faceValue: c} 
        })
        return earnings.faceValue  
}

export async function getNodeStatus() {
    try {
        let status = await axios.get(`${process.env.VUE_APP_LIVEPOOL_API}/status`)

        let stats = {
            lpVersion: status.data.Version,
            commission: status.data.Commission,
            basePrice: status.data.BasePrice,
            totalPayouts: web3.utils.fromWei(status.data.TotalPayouts.toString(), 'ether')
        }
        return stats
    } catch (e) {
        console.log(e)
    }
}