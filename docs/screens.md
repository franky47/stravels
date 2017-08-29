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

```
+------------------------------------+    +------------------------------------+
| 4G+           12:42           100% |    | 4G+           12:42           100% |
+------------------------------------+    +------------------------------------+
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|               LOGO                 |    |               LOGO                 |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|      +---------------------+       |    |                                    |
|      |  Login with Strava  |       |    |               Spinner              |
|      +---------------------+       |    |                                    |
|                                    |    |        [Debug info in __DEV__]     |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|                                    |    |                                    |
|         POWERED BY STRAVA          |    |         POWERED BY STRAVA          |  Image + link to https://www.strava.com  Image + link to https://www.strava.com
|                                    |    |                                    |  (open in external browser)  (open in external browser)
+------------------------------------+    +------------------------------------+
```

Clicking on `Login with Strava` dispatches an oauthAuthorizationRequest

If `state.strava.oauth.fetching` is `true`:
* display spinner
* display phase (if __DEV__)

Otherwise:
* display button
* display `stat.strava.oautherror` underneath (if defined)

`Powered By Strava` is an Image with link to [`https://www.strava.com`](https://www.strava.com)

## FeedScreen
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| = Travels                          |  -> open side panel
|                                    |
|     Friends     |       You        |  -> tab nav FriendsTap, YouTab
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
|                                    |  List of travels (friends' or yours)
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

## SidePanel
```
+------------------------------------+
| 4G+           12:42           100% |
+-------------------------------+----+
|                               |    |
|  Profile                      |    |  -> ProfileScreen
|                               |    |
|  Settings                     |    |  -> SettingsScreen
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|                               |    |
|  Log out                      |    |  -> confirm modal -> dispatch(logoutRequest)
|                               |    |
|       POWERED BY STRAVA       |    |  link to https://www.strava.com
+-------------------------------+----+
```

## ProfileScreen
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| <- Profile                         |  -> nav.back()
+------------------------------------+  +
|                                    |  |
|           John Appleseed           |  |
|          +--------------+          |  | Background color: green
|          |              |          |  |
|          |   Profile    |          |  |
|----------|              |----------|  +
|  Stats1  |   Picture    |  Stats2  |
|     ?    |              |     ?    |
|          +--------------+          |
|                                    |
|           Call to action           |
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

## SettingsScreen
```
+------------------------------------+
| 4G+           12:42           100% |
+------------------------------------+
| <- Settings                        |  -> nav.back()
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
| About                              |  --section--
|                                    |
|  Version                           |  title
|  Stravels version 1.2.3.4          |  subtitle
|....................................|
|  Rate this app                     |  -> Play Store / App Store URL
|....................................|
|  Maps attribution                  |  -> https://stravels.io/about/maps
|....................................|
|  Submit bug report                 |  -> Github issues
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

