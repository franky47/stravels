import Mapbox, { MapView } from 'react-native-mapbox-gl'
import Secrets from 'react-native-config'

console.log(Secrets)
Mapbox.setAccessToken(Secrets.MAPBOX_ACCESS_TOKEN)

export default MapView
