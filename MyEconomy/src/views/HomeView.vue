<template>
  <Block>
    <div class="text-center">
      <h1>Din ekonomi just nu</h1>
      <HealthPartial />
      <div v-if="true">
        <p class="text-bold mt-5">Du har i snitt</p>
        <p class="h2">10000</p>
        <p class="text-bold">över varje måndad</p>
      </div>
      <div v-else>
        <p class="text-bold mt-5">Du går back</p>
        <p class="h2">10000</p>
        <p class="text-bold">varje måndad</p>
      </div>
    </div>

    <div class="d-flex justify-between text-bold mt-5">
      <p>Du sparar för tillfället</p>
      <p>200</p>
    </div>
    <div class="d-flex justify-between">
      <p>Rekommenderat sparande
        <InfoButton>
          <p>Generellt så rekommenderar vi att du sparar 10% av din nettolön och det är vad vi har räknat på här</p>
          <p class="mt-1">Det första du vill spara till är en buffert, det är bra att ha ca 2 månadslöner om några oförutsedda händelser skulle ske</p>
          <p class="mt-1">Efter det så kan man spara till långsiktiga och kortsiktiga mål. Glöm inte pensionen som vi anser bör vara ca hälften (5%) av ditt sparande.</p>
        </InfoButton>

      </p>
      <p>100 kr</p>
    </div>


  </Block>

</template>

<script setup>
import Block from '../components/Block.vue';
import HealthPartial from '../components/HealthPartial.vue';
import InfoButton from '../components/InfoButton.vue';


</script>

<style scoped>

</style>