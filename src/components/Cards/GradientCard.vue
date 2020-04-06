<template>
  <div class="col-sm-12 col-xl-4">
            <div class="card order-card" :class="color">
                <div class="card-block">
                    <h6 class="m-b-20">{{title}}</h6>
                    <h2 class="text-right"><i :class="icon" class="f-left"></i><span>{{statistic}}</span></h2>
                </div>
            </div>
        </div>
</template>
<script>
import Card from "./Card.vue";

export default {
  name: "stats-card",
  components: {
    Card
  },
  props: {
        title: {
        type: String,
        description: "Card title"
      },
      statistic: {
        type: String,
        description: "Card statistic"
      },
      color: {
          type: String,
          description: "Card background gradient"
      },
      icon: {
          type: String,
          description: "Card icon"
      }
  }
};
</script>

<style lang="scss">
.order-card {
    color: #fff;
}

.bg-c-pink {
    background: linear-gradient(45deg,#FF5370,#ff869a);
}


.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    border: none;
    margin-bottom: 30px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.card .card-block {
    padding: 25px;
}

.order-card i {
    font-size: 26px;
}

.f-left {
    float: left;
}

.f-right {
    float: right;
}
</style>
