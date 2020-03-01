<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.tableData"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </base-table>
          </div>
        </card>
      </div>
      <div class="col-12">
        <img class="center-img" src="@/assets/img/livepool.png" />
       </div>
    </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["Address", "Capacity", "Load", "Balance", "Payouts"];

import getNodeStatus from "@/scripts/transcoders"
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      tableheader: {
        title: "Connected Transcoders",
        columns: [...tableColumns]
      }
    };
  },
  computed: {
      table1 () {
          return {
              title: this.tableheader.title,
              columns: this.tableheader.columns,
              tableData: this.$store.state.status.transcoders
          }
      }
  },
  created () {
    this.$store.dispatch("storeStatus")
       setInterval(() => {
                this.$store.dispatch("storeStatus")
            }, 5000)
  }
};
</script>
<style>

.center-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}

</style>
