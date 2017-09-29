import Mapbox, { MapView } from 'react-native-mapbox-gl'
import Secrets from 'react-native-config'

Mapbox.setAccessToken(Secrets.MAPBOX_ACCESS_TOKEN)

export default MapView
