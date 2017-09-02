const functions = require('firebase-functions')
// const admin = require('firebase-admin')
const utility = require('../utility')
const axios = require('axios')
const qs = require('querystringify')
// const Polyline = require('@mapbox/polyline')

module.exports = functions.https.onRequest((request, response) => {
  // Reply to POST only
  const validateInput = () => utility.validateInput({
    allowedMethod: 'POST',
    allowEmptyBody: false,
    requiredKeys: [
      'width',
      'height',
      'paths'
    ]
  })
  const decodePolylines = (data) => {
    const polylines = data.paths.map((path) => {
      // simplify polyline
    })
    return { data, polylines }
  }
  const buildUrls = ({ data, polylines }) => {
    const buildUrl = (maptype) => {
      const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap'
      const params = {
        maptype,
        size: `${data.width}x${data.height}`,
        scale: data.scale || 1
      }
      return baseUrl + qs.stringify(params)
    }
    return {
      roadmapUrl: buildUrl('roadmap'),
      terrainUrl: buildUrl('terrain')
    }
  }
  const queryGoogleMapsApi = ({ data, roadmapUrl, terrainUrl }) => {
    return Promise.all([
      axios.get(roadmapUrl),
      axios.get(terrainUrl)
    ]).then(([roadmapImage, terrainImage]) => ({
      data,
      roadmapImage,
      terrainImage
    }))
  }
  const combineImages = ({ data, roadmapImage, terrainImage }) => {
    const combinedImage = roadmapImage
    return { data, combinedImage }
  }
  const upload = ({ data, combinedImage }) => {
    const url = ''
    return url
  }

  return Promise.resolve()
    .then(validateInput)
    .then(decodePolylines)
    .then(buildUrls)
    .then(queryGoogleMapsApi)
    .then(combineImages)
    .then(upload)
    .then((data) => {
      return response.json('Coming soon')
    })
})
