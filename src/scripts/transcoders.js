import axios from 'axios'

import Web3 from "web3"
let web3 = new Web3(process.env.VUE_APP_GETH_URL)


function addBalanceToTranscoder(transcoder) {
    return web3.eth.getBalance(transcoder.address).then(bal => {
        transcoder['payouts'] = web3.utils.fromWei(bal.toString(), 'ether') + " Ξ"
        return transcoder
    }).catch(e => console.log(e))
}

async function formatStats(stats) {
    let mapped = stats.map(s => ({
        address: s.EthereumAddress,
        capacity: s.Capacity,
        load: s.Load,
        balance: web3.utils.fromWei(s.Balance.toString(), 'ether') + " Ξ",
    }))
    mapped = await Promise.all(mapped.map(m => addBalanceToTranscoder(m)))
    return mapped.sort((a, b) => parseInt(a.address.substring(2), 10)> parseInt(b.address.substring(2), 10))
}

function storeStatus(commit, status) {
    commit("storeStatus", status)
}

export default async function getNodeStatus(commit) {
    axios.get(`${process.env.VUE_APP_BASE_URL}/status`).then(
        async res => {
            let status = {
                transcoders: await formatStats(res.data.RegisteredTranscoders),
                lpVersion: res.data.Version
            }
            storeStatus(commit, status)
        }
    ).catch(e => console.log(e))
}