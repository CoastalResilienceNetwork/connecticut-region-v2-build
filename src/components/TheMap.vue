<script setup>
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import TileLayer from '@arcgis/core/layers/TileLayer'
import GroupLayer from '@arcgis/core/layers/GroupLayer.js'
import Map from '@arcgis/core/Map'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js'
import Graphic from '@arcgis/core/Graphic'
import esriRequest from '@arcgis/core/request'
import { useMapStore } from '@/stores/map'
import { useRiskStore } from '@/stores/RiskExplorer'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const mapStore = useMapStore()
onMounted(async () => {
  const arcgisMap = document.querySelector('arcgis-map')
  const riskStore = useRiskStore()
  const mapStore = useMapStore()

  //Resilient Projects tab
  const graphicsLayer = new GraphicsLayer({
    id: 'graphicsLayer',
    visible: false,
  })
  const riskExplorerGraphics = new GraphicsLayer({
    id: 'riskExplorerGraphics',
    visible: false,
  })
  let projects = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Regional_Resilience_Projects/MapServer',
    title: '',
    id: 'projects',
    sublayers: [
      { id: 0, visible: false, definitionExpression: '1=1' },
      { id: 1, visible: false, definitionExpression: '1=1' },
      { id: 2, visible: false, definitionExpression: '1=1' },
      { id: 3, visible: false, definitionExpression: '1=1' },
      { id: 4, visible: false, definitionExpression: '1=1' },
    ],
  })
  // Resilient Projects tab group
  let projectsGroup = new GroupLayer({
    title: '',
    id: 'projects',
    visible: false,
    layers: [
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer/0',
        visible: false,
        definitionExpression: '1=1',
      }),
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer/1',
        visible: false,
        definitionExpression: '1=1',
      }),
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer/2',
        visible: false,
        definitionExpression: '1=1',
      }),
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer/3',
        visible: false,
        definitionExpression: '1=1',
      }),
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer/4',
        visible: false,
        definitionExpression: '1=1',
      }),
    ],
  })
  let attachments = new FeatureLayer({
    url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RegionalResilience/FeatureServer',
    id: 'attachments',
    visible: false,
  })
  //Regional Planning, Community Planning & Future Habitat tabs
  // let connecticut = new MapImageLayer({
  //   url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Connecticut/MapServer',
  //   title: 'Connecticut',
  //   id: 'connecticut',
  // })

  const connecticutGroup = await buildConnecticutGroupLayer()

  async function buildConnecticutGroupLayer() {
    const SERVICE_URL =
      'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_Connecticut/FeatureServer'

    // ─────────────────────────────
    // Helpers
    const GL = (title, id, layers) =>
      new GroupLayer({
        title,
        id,
        visible: false,
        layers,
      })

    try {
      const response = await esriRequest(`${SERVICE_URL}?f=json`, {
        responseType: 'json',
      })

      const layerIdsByName = {}
      response.data.layers.forEach((l) => {
        if (!layerIdsByName[l.name]) {
          layerIdsByName[l.name] = []
        }
        layerIdsByName[l.name].push(l.id)
      })

      const FL = (name, id) => {
        const layerId = layerIdsByName[name]?.shift() ?? id

        return new FeatureLayer({
          url: `${SERVICE_URL}/${layerId}`,
          title: name,
          id,
          visible: false,
        })
      }
      const MIL = (name, id) => {
        const layerId = layerIdsByName[name]?.shift() ?? id

        return new MapImageLayer({
          url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
          title: name,
          id,
          visible: true,
          sublayers: [
            {
              url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/41',
              visible: false,
            },
          ],
        })
      }

      return GL('Connecticut', 'connecticut', [
        // ─────────────────────────────
        GL('Marsh Protection Analysis', 0, [
          FL('Marsh Upland Basin (<5 meters)', 1),
          FL('Marsh Size', 2),
          FL('Costs of Buildings Exposed', 3),
          FL('Amount of Critical Facilities Exposed', 4),
          FL('Amount of Roads Exposed', 5),
          FL('Amount of People Exposed', 6),
          FL('Average Social Vulnerability', 7),
          FL('Likelihood of Shoreline Armoring', 8),
          FL('Marsh Protection Potential Index', 9),
        ]),

        // ─────────────────────────────
        GL('Ecological', 10, [
          FL('Important Bird Areas (Audubon Society)', 11),
          FL('Tidal Wetlands (NWI)', 12),
          FL('Tidal Wetlands (CT DEP 1990s)', 13),
          FL('Beach & Dune Habitat', 14),
          FL('Coastal Submerged Aquatic Vegetation (SAV)', 15),
          FL('Shoreline Exposure to Wave Energy', 16),
        ]),

        // ─────────────────────────────
        GL('Economic', 17, [
          FL('Existing Total Building Replacement Cost ($1,000s)', 18),
          FL('Estimated Percent Building Loss - 2080 High Sea-level Rise', 19),
          FL(
            'Estimated Percent Building Loss - Category 3 storm with 2080 High Sea-level Rise',
            20,
          ),
          FL('Estimated Percent Building Loss - Category 3 storm', 21),
          FL('Estimated Percent Building Loss - Category 2 storm', 22),
        ]),

        // ─────────────────────────────
        GL('Social', 23, [
          FL('Percent Below Poverty', 24),
          FL('Population Density - People per Square Mile', 25),
          FL('Percent Renter Occupied', 26),
          FL('Median Household Income ($)', 27),
          FL('Age - percent under 5 years old', 28),
          FL('Age - percent over 64 years old', 29),
          FL('Social Vulnerability Index (SoVI) for CT (Cutter et al. 2010)', 30),
          FL('No Data Available', 31),
        ]),

        // ─────────────────────────────
        GL('Critical Facilities', 32, [
          FL('Airport Facility', 33),
          FL('Electric Power Facility', 34),
          FL('Fire Station', 35),
          FL('Hospital', 36),
          FL('Police Station', 37),
          FL('Potable Water Facility', 38),
          FL('School Facility', 39),
          FL('Wastewater Facility', 40),
        ]),

        // ─────────────────────────────
        GL('Boundaries', 41, [FL('Cities & Towns', 42), FL('Counties', 43)]),

        // ─────────────────────────────
        GL('Land Use Management', 44, [
          FL(
            'Likelihood of Shoreline Protection (e.g. Armoring) with 1 meter Sea-level Rise (Titus et al. 2009)',
            45,
          ),
          MIL('2006 Land Cover (NOAA CSC)', 46),
          FL('Developed & Agricultural Land Cover (2006 NOAA CSC)', 47),
        ]),

        // ─────────────────────────────
        GL('Marsh Advancement Zones', 48, [
          FL('2020 Marsh Advancement Zone', 49),
          FL('2050 Marsh Advancement Zone', 50),
          FL('2080 Marsh Advancement Zone', 51),
        ]),

        // ─────────────────────────────
        GL('Western CT COG', 52, [
          GL('Greenwich', 53, [FL('Open Space', 54), FL('Parcels', 55)]),
          GL('Stamford', 56, [FL('Open Space', 57), FL('Parcels', 58)]),
          GL('Darien', 59, [FL('Open Space', 60), FL('Parcels', 61)]),
          GL('Norwalk', 62, [FL('Open Space', 63), FL('Parcels', 64)]),
          GL('Westport', 65, [FL('Open Space', 66), FL('Parcels', 67)]),
        ]),

        // ─────────────────────────────
        GL('Greater Bridgeport Regional Council', 68, [
          GL('Fairfield', 69, [FL('Open Space', 70), FL('Parcels', 71)]),
          GL('Bridgeport', 72, [FL('Open Space', 73), FL('Parcels', 74)]),
          GL('Stratford', 75, [FL('Open Space', 76), FL('Parcels', 77)]),
        ]),

        // ─────────────────────────────
        GL('South Central Regional COG', 78, [
          GL('Milford', 79, [FL('Open Space', 80), FL('Parcels', 81)]),
          GL('West Haven', 82, [FL('Open Space', 83), FL('Parcels', 84)]),
          GL('New Haven', 85, [FL('Open Space', 86), FL('Parcels', 87)]),
          GL('East Haven', 88, [FL('Open Space', 89), FL('Parcels', 90)]),
          GL('Branford', 91, [FL('Open Space', 92), FL('Parcels', 93)]),
          GL('Guilford', 94, [
            FL('Open Space', 95),
            FL('Parcels', 96),
            FL('Public Safety Buildings', 97),
            FL('Schools', 98),
            FL('Manholes', 99),
            FL('Storm Pipes', 100),
            FL('Outfalls', 101),
            FL('Dam', 102),
            FL('Coastal Management Boundary', 103),
            FL('FEMA Flood Zone', 104),
            FL('Town Owned Open Space', 105),
            FL('Aquifer Protection Area District', 106),
            FL('Downtown boundary', 107),
            FL('Historic Districts', 108),
            FL('Guilford Land Conservation Trust', 109),
            FL('Planned Residential Development', 110),
            FL('Zoning', 111),
          ]),
          GL('Madison', 112, [FL('Open Space', 113), FL('Parcels', 114)]),
        ]),

        // ─────────────────────────────
        GL('River COG', 115, [
          GL('Clinton', 116, [FL('Open Space', 117), FL('Parcels', 118)]),
          GL('Westbrook', 119, [FL('Open Space', 120), FL('Parcels', 121)]),
          GL('Old Saybrook', 122, [
            FL('Open Space', 123),
            FL('Parcels', 124),
            FL('Critical Facilities', 125),
          ]),
          GL('Old Lyme', 126, [FL('Open Space', 127), FL('Parcels', 128)]),
        ]),

        // ─────────────────────────────
        GL('Southeastern CT COG', 129, [
          GL('East Lyme', 130, [
            FL('Open Space', 131),
            FL('Parcels', 132),
            FL('Building footprints', 133),
            FL('Zoning', 134),
          ]),
          GL('Waterford', 135, [
            FL('Open Space', 136),
            FL('Parcels', 137),
            FL('Building footprints', 138),
            FL('Conservation Easements', 139),
            FL('Zoning', 140),
            FL('Land Use', 141),
          ]),
          GL('New London', 142, [FL('Open Space', 143), FL('Parcels', 144)]),
          GL('Groton', 145, [FL('Open Space', 146), FL('Parcels', 147)]),
          GL('Stonington', 148, [FL('Open Space', 149), FL('Parcels', 150)]),
        ]),
      ])
    } catch (error) {
      console.error('Failed to build Connecticut group layer', error)
      return new GroupLayer({
        title: 'Connecticut',
        id: 'connecticut',
        layers: [],
      })
    }
  }

  //Risk explorer tab
  let riskExplorer = new MapImageLayer({
    url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Risk_Explorer_CT/MapServer',
    title: 'Risk Explorer',
    id: 'riskExplorer',
    sublayers: [{ id: 0, opacity: 1.0 }],
    visible: false,
  })
  // Risk explorer tab group
  let riskExplorerGroup = new GroupLayer({
    title: 'Risk Explorer',
    id: 'riskExplorer',
    layers: [
      new FeatureLayer({
        url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RiskExplorer/FeatureServer/0',
        visible: false,
      }),
    ],
  })
  let riskExplorerFeatures = new FeatureLayer({
    url: 'https://services.arcgis.com/F7DSX1DSNSiWmOqh/arcgis/rest/services/NST_CT_RiskExplorer/FeatureServer/0',
    id: 'riskExplorerFeatures',
    visible: false,
  })

  //Flood and Sea Level Rise tab
  // let floodSeaLevelRise = new MapImageLayer({
  //   url: 'https://services2.coastalresilience.org/arcgis/rest/services/Connecticut/Flood_SLR/MapServer',
  //   title: 'Flood and Sea Level Rise',
  //   id: 'floodSeaLevelRise',
  //   sublayers: [
  //     { id: 0, visible: false, opacity: 1.0 },
  //     { id: 1, visible: false, title: 'Connecticut - 2080 - Med - Category 2' },
  //     { id: 2, visible: false, opacity: 1.0 },
  //     { id: 3, visible: false, opacity: 1.0 },
  //     { id: 4, visible: false, title: 'Connecticut - 2050 - Med - Category 2' },
  //     { id: 5, visible: false, opacity: 1.0 },
  //     { id: 6, visible: false, opacity: 1.0 },
  //     { id: 7, visible: false, title: 'Connecticut - 2020 - Med - Category 2 ' },
  //     { id: 8, visible: false, opacity: 1.0 },
  //     { id: 9, visible: false, opacity: 1.0 },
  //     { id: 10, visible: false, title: 'Connecticut - 2080 - Med - Category 3' },
  //     { id: 11, visible: false, opacity: 1.0 },
  //     { id: 12, visible: false, opacity: 1.0 },
  //     { id: 13, visible: false, title: 'Connecticut - 2050 - Med - Category 3' },
  //     { id: 14, visible: false, opacity: 1.0 },
  //     { id: 15, visible: false, opacity: 1.0 },
  //     { id: 16, visible: false, title: 'Connecticut - 2020 - Med - Category 3' },
  //     { id: 17, visible: false, opacity: 1.0 },
  //     { id: 18, visible: false, opacity: 1.0 },
  //     { id: 19, visible: false, title: 'Connecticut - 2080 - Med - No Storm' },
  //     { id: 20, visible: false, opacity: 1.0 },
  //     { id: 21, visible: false, opacity: 1.0 },
  //     { id: 22, visible: false, title: 'Connecticut - 2050 - Med - No Storm' },
  //     { id: 23, visible: false, opacity: 1.0 },
  //     { id: 24, visible: false, opacity: 1.0 },
  //     { id: 25, visible: false, title: 'Connecticut - 2020 - Med - No Storm' },
  //     { id: 26, visible: false, opacity: 1.0 },
  //     { id: 27, visible: false, opacity: 1.0 },
  //     { id: 28, visible: false, opacity: 1.0 },
  //   ],
  // })
  // Flood and Sea Level Rise tab group
  // let floodSeaLevelRiseGroup = new GroupLayer({
  //   title: 'Flood and Sea Level Rise',
  //   id: 'floodSeaLevelRise',
  //   layers: [
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/11',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/12',
  //           visible: false,
  //           title: 'Connecticut - 2080 - Med - Category 2',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/13',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/14',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/15',
  //           visible: false,
  //           title: 'Connecticut - 2050 - Med - Category 2',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/16',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/17',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/18',
  //           visible: false,
  //           title: 'Connecticut - 2020 - Med - Category 2',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/19',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/20',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/21',
  //           visible: false,
  //           title: 'Connecticut - 2080 - Med - Category 3',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/22',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/23',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/24',
  //           visible: false,
  //           title: 'Connecticut - 2050 - Med - Category 3',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/25',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/26',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/27',
  //           visible: false,
  //           title: 'Connecticut - 2020 - Med - Category 3',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/28',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/29',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/30',
  //           visible: false,
  //           title: 'Connecticut - 2080 - Med - No Storm',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/31',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/32',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/33',
  //           visible: false,
  //           title: 'Connecticut - 2050 - Med - No Storm',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/34',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/35',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/36',
  //           visible: false,
  //           title: 'Connecticut - 2020 - Med - No Storm',
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/37',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/38',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //     new MapImageLayer({
  //       url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/',
  //       visible: false,
  //       sublayers: [
  //         {
  //           url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer/39',
  //           visible: false,
  //           opacity: 1.0,
  //         },
  //       ],
  //     }),
  //   ],
  // })

  let floodSeaLevelRiseGroup = new MapImageLayer({
    url: 'https://cumulus-ags.tnc.org/arcgis/rest/services/nascience/CCS_Rasters_1/MapServer',
    title: 'Flood and Sea Level Rise',
    id: 'floodSeaLevelRise',
    sublayers: [
      { id: 11, visible: false, opacity: 1.0 },
      { id: 12, visible: false, title: 'Connecticut - 2080 - Med - Category 2' },
      { id: 13, visible: false, opacity: 1.0 },
      { id: 14, visible: false, opacity: 1.0 },
      { id: 15, visible: false, title: 'Connecticut - 2050 - Med - Category 2' },
      { id: 16, visible: false, opacity: 1.0 },
      { id: 17, visible: false, opacity: 1.0 },
      { id: 18, visible: false, title: 'Connecticut - 2020 - Med - Category 2 ' },
      { id: 19, visible: false, opacity: 1.0 },
      { id: 20, visible: false, opacity: 1.0 },
      { id: 21, visible: false, title: 'Connecticut - 2080 - Med - Category 3' },
      { id: 22, visible: false, opacity: 1.0 },
      { id: 23, visible: false, opacity: 1.0 },
      { id: 24, visible: false, title: 'Connecticut - 2050 - Med - Category 3' },
      { id: 25, visible: false, opacity: 1.0 },
      { id: 26, visible: false, opacity: 1.0 },
      { id: 27, visible: false, title: 'Connecticut - 2020 - Med - Category 3' },
      { id: 28, visible: false, opacity: 1.0 },
      { id: 29, visible: false, opacity: 1.0 },
      { id: 30, visible: false, title: 'Connecticut - 2080 - Med - No Storm' },
      { id: 31, visible: false, opacity: 1.0 },
      { id: 32, visible: false, opacity: 1.0 },
      { id: 33, visible: false, title: 'Connecticut - 2050 - Med - No Storm' },
      { id: 34, visible: false, opacity: 1.0 },
      { id: 35, visible: false, opacity: 1.0 },
      { id: 36, visible: false, title: 'Connecticut - 2020 - Med - No Storm' },
      { id: 37, visible: false, opacity: 1.0 },
      { id: 38, visible: false, opacity: 1.0 },
      { id: 39, visible: false, opacity: 1.0 },
    ],
  })

  let noaa0 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_0ft/MapServer',
    visible: false,
    id: 'noaa0',
  })
  let noaa1 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer',
    visible: false,
    id: 'noaa1',
  })
  let noaa2 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer',
    visible: false,
    id: 'noaa2',
  })
  let noaa3 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer',
    visible: false,
    id: 'noaa3',
  })
  let noaa4 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer',
    visible: false,
    id: 'noaa4',
  })
  let noaa5 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer',
    visible: false,
    id: 'noaa5',
  })
  let noaa6 = new TileLayer({
    url: 'https://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer',
    visible: false,
    id: 'noaa6',
  })

  arcgisMap.map = new Map({
    basemap: 'topo',
    layers: [
      projectsGroup,
      attachments,
      graphicsLayer,
      riskExplorerGraphics,
      floodSeaLevelRiseGroup,
      noaa0,
      noaa1,
      noaa2,
      noaa3,
      noaa4,
      noaa5,
      noaa6,
      connecticutGroup,
      riskExplorerGroup,
      riskExplorerFeatures,
    ],
  })

  arcgisMap.addEventListener('arcgisViewReadyChange', (event) => {
    const { view } = event.target
    riskStore.mapView = view
    view.on('click', (event) => {
      mapStore.executeIdentify(event.mapPoint)
    })

    riskExplorerFeatures.when(() => {
      view.whenLayerView(riskExplorerFeatures).then(() => {
        riskExplorerFeatures
          .queryFeatures({
            where: '1=1',
            outFields: '*', // Replace with your actual field names
            returnGeometry: true,
          })
          .then(function (results) {
            const graphics = results.features.map((feature) => {
              const attributes = feature.attributes

              // Custom risk calculation
              const arr = riskStore.vulnSelection
              let vul = 5
              if (arr.length > 0) {
                var sm = 0
                for (var i = 0; i < arr.length; i++) {
                  sm = sm + attributes[arr[i]]
                }
                vul = sm / arr.length
              }
              let exp = feature.attributes[riskStore.expSelection]
              let score = vul * exp
              // Create a new graphic with custom symbology
              let sym = ''
              const sym1 = {
                type: 'simple-marker',
                style: 'circle',
                color: [44, 123, 182],
                size: 9,
                outline: {
                  color: [44, 123, 182],
                  width: 1,
                },
              }

              const sym2 = {
                type: 'simple-marker',
                style: 'circle',
                color: [171, 217, 233],
                size: 9,
                outline: {
                  color: [171, 217, 233],
                  width: 1,
                },
              }

              const sym3 = {
                type: 'simple-marker',
                style: 'circle',
                color: [255, 255, 191],
                size: 9,
                outline: {
                  color: [255, 255, 191],
                  width: 1,
                },
              }

              const sym4 = {
                type: 'simple-marker',
                style: 'circle',
                color: [253, 174, 97],
                size: 9,
                outline: {
                  color: [253, 174, 97],
                  width: 1,
                },
              }

              const sym5 = {
                type: 'simple-marker',
                style: 'circle',
                color: [215, 25, 28],
                size: 9,
                outline: {
                  color: [215, 25, 28],
                  width: 1,
                },
              }
              if (score < 5) {
                sym = sym1
              }
              if (score >= 5 && score < 10) {
                sym = sym2
              }
              if (score >= 10 && score < 15) {
                sym = sym3
              }
              if (score >= 15 && score < 20) {
                sym = sym4
              }
              if (score >= 20 && score <= 25) {
                sym = sym5
              }
              return new Graphic({
                geometry: feature.geometry,
                attributes: {
                  ...attributes,
                  riskScore: score,
                },
                symbol: sym,
              })
            })

            // Add graphics to a GraphicsLayer
            arcgisMap.map.findLayerById('riskExplorerGraphics').removeAll()
            arcgisMap.map.findLayerById('riskExplorerGraphics').addMany(graphics)
          })
      })
    })
  })
})
</script>

<template>
  <arcgis-map
    id="my-map"
    :style="$q.screen.sm || $q.screen.xs ? 'min-height:50vh' : 'calc(100vh - 120px)'"
    center=" -72.53795820793547,  41.10615832681711"
    zoom="8"
  >
    <arcgis-legend
      v-if="route.name !== 'risk'"
      position="bottom-right"
      legend-style="classic"
    ></arcgis-legend>
    <arcgis-zoom position="top-left"></arcgis-zoom>
    <arcgis-basemap-toggle position="top-right" :next-basemap="'satellite'"></arcgis-basemap-toggle>
    <div style="position: absolute; top: 100px; right: 15px; z-index: 10">
      <calcite-button
        id="clear"
        icon="layers"
        square
        :ripple="false"
        class="bg-white text-primary"
        size="12px"
        @click="mapStore.clearOtherLayers()"
        >Hide Overlays</calcite-button
      >
    </div>
    <arcgis-expand
      id="expandMeasurement_line"
      expanded
      close-on-esc
      position="top-left"
      mode="floating"
    >
      <arcgis-distance-measurement-2d></arcgis-distance-measurement-2d>
    </arcgis-expand>
  </arcgis-map>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://js.arcgis.com/4.32/esri/themes/light/main.css';

#my-map {
  flex: 1;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}

.esri-view .esri-view-surface--touch-none:focus::after {
  outline: none !important;
}

.esri-popup .sizer {
  width: 500px !important;
}

h3.esri-widget__heading {
  line-height: 1rem !important;
}
</style>
