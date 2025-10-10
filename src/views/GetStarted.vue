<script setup></script>

<template>
  <div style="background: linear-gradient(180deg,rgba(244, 242, 230, 1) 0%, rgba(243, 242, 230, 1) 24%, rgba(230, 235, 226, 1) 45%, rgba(210, 225, 220, 1) 67%, rgba(212, 218, 202, 1) 100%);">
    <q-bar class="bg-white" style="border-bottom: 1px solid lightgray">
        <div class="text-caption text-bold">Get Started</div>
    </q-bar>
    
  <q-scroll-area class="q-pa-md" style="height: calc(100vh - 90px);background: #F4F2E6;
      background-color: rgba(252, 253, 254, 0.5);">
  
    <h5 class="q-mt-xs q-mb-sm text-bold">Connecticut</h5>
    <p class="body2">
      Coastal Resilience is a decision support tool that provides local, regional, state and
      national stakeholders a step-wisee process to guide decisions to reduce the ecological and
      socio-economic risks of coastal and inland hazards. If you need help figuring out how to start, 
      click on the Tour tab in the bottom left of the screen, or visit our <a href="https://coastalresilience.org/tools/training/" target="_blank" >Training</a> page.
    </p>

    <p class="text-body2 text-bold">Start exploring</p>

       <q-item class="q-ml-none q-pl-none">
        <q-item-section top avatar class="q-pl-none q-ml-none">
          <q-img src="img/getStarted_flood_slr.png"></q-img>
        </q-item-section>

        <q-item-section>
          <q-item-label class="accent text-bold">Flood and Sea Level Rise</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn color="primary" to="/sea-level-rise" outline size="sm" square>Go</q-btn>
        </q-item-section>
      </q-item>
      <p class="text-caption q-ml-xs">
        Identifies potential inundation during coastal storms from wind, storm surge, and future
        flood risk based on sea-level rise predictions.
      </p>
   
      <q-item class="q-ml-none q-pl-none">
        <q-item-section top avatar class="q-pl-none q-ml-none">
          <q-img src="img/getStarted_projects.png"></q-img>
        </q-item-section>

        <q-item-section>
          <q-item-label class="accent text-bold">Regional Resilience Projects</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn color="primary" to="/projects" outline size="sm" square>Go</q-btn>
        </q-item-section>
      </q-item>
      <p class="text-caption q-ml-xs">Current regional resilient projects.</p>
     
      <q-item class="q-ml-none q-pl-none">
        <q-item-section top avatar class="q-pl-none q-ml-none">
          <q-img src="img/getStarted_flood_slr.png"></q-img>
        </q-item-section>

        <q-item-section>
          <q-item-label class="accent text-bold">Regional Planning</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn color="primary" outline to="regional-planning" size="sm" square>Go</q-btn>
        </q-item-section>
      </q-item>
      <p class="text-caption q-ml-xs">
        Regional and state based data layers to inform resilience planning.
      </p>
     
      <q-item class="q-ml-none q-pl-none">
        <q-item-section top avatar class="q-pl-none q-ml-none">
          <q-img src="img/getStarted_risk_explorer.png"></q-img>
        </q-item-section>

        <q-item-section>
          <q-item-label class="accent text-bold">Risk Explorer</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn color="primary" to="risk-explorer" outline size="sm" square>Go</q-btn>
        </q-item-section>
      </q-item>
      <p class="text-caption q-ml-xs">
        Shows how the size and distribution of salt marshes and other coastal habitats may change in
        response to future projected sea level rise scenarios.
      </p>
     <div class="q-pa-md text-center">
      <q-img src="/img/tncLogo.png" style="width:175px"></q-img>
     </div>
   

  </q-scroll-area>
  </div>
</template>
<style>
.accent {
  color: #60c7d0;
}
</style>
