# Goals

Display stats on dockless usage for a given date range.

**Stats**
- Total # of trips
- Total # of miles
- Total # of Unique Units Identified

**Bonus: Filter by mode and write tests**

# Plan for React Version

Examine endpoint documentation to understand format and units of data.

**Components**

 - `<App />`
 - `<Trips />`
 - `<Miles />`
 - `<UniqueUnits />`

**Data Storage and Props**
Store JSON data in `<App />` state as `state.trips` and create functions to calculate stats and convert units if necessary. Store stats in state in `<App />` and pass as props to components.

**Filtering**
Avoid mutating `state.trips`. Use `.filter()` and emit changes to stats with a separate function to call upon user choosing filter variables.

**Filter Menus**

Create components with callbacks to pass filter variables to `<App />`.

**Responsive design**

Use React Bootstrap. Use Cards for stats components.

**Write Tests**

Explore writing tests for React if time allows.
