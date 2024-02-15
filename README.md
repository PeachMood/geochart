# 📊 Geochart

Library for plotting graphs in the area of geonavigation

## 🛠️ Getting started

### Prerequisites
For local use of the library, it is recommended to install the following:
* [Node.js 18.12+](https://nodejs.org/ru/blog/release/v18.12.0)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (usually comes with Node.js)
* [React 18.2+](https://react.dev/learn/installation)

### Local installation
1. Clone the repository and move to the directory 
    ```shell
    git clone https://github.com/PeachMood/geochart.git
    cd geochart
    ```
2. Install the necessary dependencies and build the library
    ```shell
    npm install
    npm build
    ``` 
3. Create global link to the library
    ```shell
    npm link
    ```
4. Move to the project directory and link the library locally
    ```shell
    cd react-example-project
    npm link geochart
    ```

## 📒 Usage
### Import
All library components are located in the geochart package
```JavaScript
import { LogView, Curve, CurveTrack, DepthTrack } from 'geochart';
```
### Example
1. Place the LogView component in the beginning - this is the workspace for plotting. Then pass the depth data to the component and other parameters at your choice
```JavaScript
function App() {
  return (
    <div className="page">
      <div className="container">
        <LogView depth={depth} orientation="horizontal">
        </LogView>
      </div>
    </div>
  );
}
```
2. Now place the CurveTrack as a child element - this is a component for grouping graphs. Set the parameters you need
```JavaScript
function App() {
  return (
    <div className="page">
      <div className="container">
        <LogView depth={depth} orientation="horizontal">
          <CurveTrack></CurveTrack>
        </LogView>
      </div>
    </div>
  );
}
```
3. Finally, add curves: specify the data, name (must be unique for track), color, range and so on
```JavaScript
function App() {
  return (
    <div className="page">
      <div className="container">
        <LogView depth={depth} orientation="horizontal">
          <CurveTrack>
            <Curve name="ROP AVG" data={ropAvg} style={{ color: '#B80C09' }} />
            <Curve name="ACTECDX" data={actecdx} style={{ color: '#FBBB3B' }} />
          </CurveTrack>
        </LogView>
      </div>
    </div>
  );
}
```
4. Don't forget to add DepthTrack
```JavaScript
function App() {
  return (
    <div className="page">
      <div className="container">
        <LogView depth={depth} orientation="horizontal">
          <CurveTrack>
            <Curve name="ROP AVG" data={ropAvg} style={{ color: '#B80C09' }} />
            <Curve name="ACTECDX" data={actecdx} style={{ color: '#FBBB3B' }} />
          </CurveTrack>
          <DepthTrack main={{ name: 'MD', color: '#021D38' }} />
        </LogView>
      </div>
    </div>
  );
}
```
5. It will work out something like the following
![image](https://github.com/PeachMood/geochart/assets/71270552/082922ad-d5af-4fc9-9a56-592fc410c34b)
