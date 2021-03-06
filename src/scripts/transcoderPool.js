import axios from 'axios'
import { request } from 'graphql-request'


import Web3 from "web3"
let web3 = new Web3(process.env.VUE_APP_GETH_URL)

export async function getTranscoders() {
    let urls = JSON.parse(process.env.VUE_APP_LIVEPOOL_API)
    let regions = await Promise.all(urls.map(url => axios.get(`${url}/transcoders`)))
    regions = regions.map(r => r.data)
    regions = [].concat.apply([], regions)
    let transcoders = []
    regions.forEach(r => {
        for (let t in r ) { transcoders.push(r[t])}
    })
    
        return formatTranscoders(
            transcoders
        )
}

function formatTranscoders(stats) {
    let transcoders = []
    for (let transcoder in stats) {
        transcoders.push({
            address: transcoder,
            pending: web3.utils.fromWei(stats[transcoder].Pending.toString(), 'ether').substring(0,8) + " Ξ",
            payout: web3.utils.fromWei(stats[transcoder].Payout.toString(), 'ether').substring(0,8) + " Ξ",
            capacity: stats[transcoder].Nodes.reduce((total, cap) => {
                total.Capacity += cap.Capacity
                return total
            }).Capacity,
            nodes: stats[transcoder].Nodes.map(t => t.Address),
            region: stats[transcoder].Region
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
        let urls = JSON.parse(process.env.VUE_APP_LIVEPOOL_API)

        let statusses = await Promise.all(urls.map(url => axios.get(`${url}/status`)))
        statusses = [].concat(...statusses)
        let totalPayouts = statusses.map(s => web3.utils.toBN(s.data.TotalPayouts.toString()))
        totalPayouts = totalPayouts.reduce((p, n) => p.add(n))
        let stats = {
            lpVersion: statusses[0].data.Version,
            commission: statusses[0].data.Commission,
            basePrice: statusses[0].data.BasePrice,
            totalPayouts: web3.utils.fromWei(totalPayouts.toString(), 'ether')
        }
        return stats
    } catch (e) {
        console.log(e)
    }
}