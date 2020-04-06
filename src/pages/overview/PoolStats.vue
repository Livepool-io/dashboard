<template> 
    <div class="row">
        <GradientCard title="Pool Commission" :statistic="commission" icon="tim-icons icon-coins" color="bg-c-primary" />
        <GradientCard title="Total Payouts" :statistic="totalPayouts" icon="tim-icons icon-money-coins" color="bg-c-secondary" />
        <GradientCard title="Go-Livepeer Version" :statistic="lpVersion" icon="tim-icons icon-tag" color="bg-c-tertiary" />
    </div>
</template>

<script>
import GradientCard from '@/components/Cards/GradientCard'
export default {
    name: 'poolStats',
    components: {
        GradientCard
    },
    computed: {
        commission() { return this.$store.state.status.commission + " %" },
        lpVersion() { return this.$store.state.status.lpVersion.split("-")[0] || process.env.VUE_APP_VERSION_BACKUP },
        totalPayouts() { return this.$store.state.status.totalPayouts.substring(0, 5) + " Ξ" }
    }
}
</script>

<style>

</style>