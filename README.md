### @cartesianui/js

##### _Serves as x-cartesian for CartesianUI_
 
 This package includes below modules.

- Application paths
- MULTITENANCY
- LOCALIZATION
- AUTHORIZATION
- FEATURE SYSTEM
- SETTINGS
- REALTIME NOTIFICATIONS
- LOGGING
- NOTIFICATION
- MESSAGE   
- UI
- SIMPLE EVENT BUS AKA Events
- UTILS
- TIMING
- CLOCK
- SECURITY


Build and publish steps
 - Update package version
   
 - Delete *.min files in root
 - Delete cartesian.js
 - Run `npm run build-and-publish`

In case of error try below commands separately
 - Run `gulp concat`
 - Run `gulp build`
 - Run `npm publish`
