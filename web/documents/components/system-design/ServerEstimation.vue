<template>
  <div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Servers Required</h2>
    <p>How many servers are required given?</p>
    <div class="grid grid-cols-3 gap-4">

        <span>Daily active users(DAU)</span>
        <input class="bg-slate-100" id="dau">
        <span>Millions</span>

        <span>Average requests/user/day</span>
        <input class="bg-slate-100" id="aur">
        <span>Unit</span>

        <span>Total Requests/day</span>
        <span id="trd"></span>
        <span>Billion</span>

        <span>Total Requests/second</span>
        <span id="trs"></span>
        <span>Thousands</span>

        <span>Total servers required</span>
        <span id="tsr"></span>
        <span></span>
    </div>
    <div class="card-actions justify-end">
      <button @click="calculate" class="btn btn-primary">Calculate</button>
    </div>
  </div>
</div>
</template>

<script setup>
  const calculate = () => {
    const dailyActiveUsers = document.getElementById('dau').value;
    const averageRequestsPerDay = document.getElementById('aur').value;
    const totalRequestsPerDay = dailyActiveUsers * 1_000_000 * averageRequestsPerDay;
    const totalRequestsPerSecond = totalRequestsPerDay / (24 * 60 * 60)
    const requestsPer64CoresServer = 64000;
    const totalRequiredServers = totalRequestsPerSecond / requestsPer64CoresServer
    document.getElementById('trd').innerText = totalRequestsPerDay/1_000_000_000;
    document.getElementById('trs').innerText = (Math.round(totalRequestsPerSecond* 100)/100_000).toFixed(2);
    document.getElementById('tsr').innerText = Math.ceil(totalRequiredServers);
  }
</script>