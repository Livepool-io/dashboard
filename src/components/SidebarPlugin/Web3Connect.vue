<template>
<div>
    <component v-if="!connected" :is="'li'" class="nav-item" @click="onConnect">
    <a class="nav-link">
      <slot>
        <i class="tim-icons icon-wallet-43"></i>
        <p>{{$t("sidebar.web3Connect")}}</p>
      </slot>
    </a>
  </component>
      <component v-else :is="'li'" class="nav-item" @click="resetApp">
    <a class="nav-link">
      <slot>
        <i class="tim-icons icon-wallet-43"></i>
        <p>{{$t("sidebar.web3Disconnect")}}</p>
      </slot>
    </a>
  </component>
  </div>
</template>

<script>

const INITIAL_STATE = {
            web3: {},
            provider: {},
            connected: false,
            address: "",
            chainID: "",
            networkID: ""
        }

export default {
    name: "Web3Connect",
    computed: {
        connected () {return this.$store.state.web3Obj.connected}
    },
    methods: {
        connectWallet () {
            this.$web3Connect.toggleModal()
        },
        async onConnect() {
            const provider = await this.$web3Connect.connect()
            await this.subscribeProvider(provider)
            const web3 = this.$web3(provider)
            const accounts = await web3.eth.getAccounts()
            const address = accounts[0]
            const networkID = await web3.eth.net.getId()
            const chainID = await web3.eth.chainId()
            this.$store.dispatch("storeWeb3", {
                provider,
                web3,
                connected: true,
                address,
                chainID,
                networkID
            })
        },
        subscribeProvider (provider) {
            provider.on('close', () => this.resetApp())
            provider.on('accountsChanged', async (accounts) => {
            this.$store.dispatch("storeAddress", accounts[0])
    })
  },
  async resetApp() {
    const web3 = this.$store.state.web3Obj.web3
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await this.$web3Connect.clearCachedProvider()
    this.$store.dispatch("storeWeb3", {...INITIAL_STATE})
   if (this.$route.name != "overview")  this.$router.push('overview');
  }
    },
    created () {
        if (this.$web3Connect.cachedProvider) this.onConnect()
        console.log(this.$store.state.web3Obj.address)
    }
}
</script>