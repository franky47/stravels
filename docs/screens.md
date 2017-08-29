# Screens

Generic screen template:
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| <- Screen Name                     |  -> nav.back()
+------------------------------------+
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
+------------------------------------+
```

## Login Screen

State selector: `strava.oauth.fetching === false`
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|               LOGO                 |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|      +---------------------+       |
|      |  Login with Strava  |       |  -> dispatch oauthAuthorizeRequest
|      +---------------------+       |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|         POWERED BY STRAVA          |  Image + link to https://www.strava.com
|                                    |  (open in external browser)
+------------------------------------+
```

State selector: `strava.oauth.fetching === true`
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|               LOGO                 |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|               Spinner              |
|                                    |
|        [Debug info in __DEV__]     |
|                                    |
|                                    |
|                                    |
|                                    |
|         POWERED BY STRAVA          |  Image + link to https://www.strava.com
|                                    |  (open in external browser)
+------------------------------------+
```

## FeedScreen

## SettingsScreen
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| <- Settings                        |  -> nav.back()
+------------------------------------+
|                                    |
| Profile                            |  -> ProfileScreen
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
| Legal                              |  -> https://stravels.io/legal
|                                    |
| About                              |  -> AboutScreen
|                                    |
| Log out                            |  -> dispatch(logoutRequest)
|                                    |
|         POWERED BY STRAVA          |  link to https://www.strava.com
+------------------------------------+
```

## AboutScreen
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| <- About                           |  -> nav.back()
+------------------------------------+
| About                              | section
|                                    |
|  Version                           |  title
|  Stravels version 1.2.3.4          |  subtitle
|....................................|
|  Rate this app                     |  -> Play Store / App Store URL
|....................................|
|  Maps attribution                  |  -> https://stravels.io/about/maps
|....................................|
| Submit bug report                  |  -> Github issues
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
|                                    |
+------------------------------------+
```

