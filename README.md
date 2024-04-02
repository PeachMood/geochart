<h1 style="font-size: 2.5em"> 📊 Geochart </h1>

<p> Library for plotting graphs in the area of geonavigation</p>

# 🛠️ Getting started

## Prerequisites

For local use of the library, it is recommended to install the following:

- [Node.js 18.12+](https://nodejs.org/ru/blog/release/v18.12.0)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (usually comes with Node.js)
- [React 18.2+](https://react.dev/learn/installation)

## Local installation

Clone the repository and move to the directory

```shell
git clone https://github.com/PeachMood/geochart.git
cd geochart
```

Install the necessary dependencies and build the library

```shell
npm install
npm build
```

Create global link to the library

```shell
npm link
```

Move to the project directory and link the library locally

```shell
cd react-example-project
npm link geochart
```

# ✨ Components

## LogView

Workspace that provides an interface for visualizing and editing different types of geophysical data

![LogView](/assets/LogView.png)

### Interface

```TypeScript
interface LogViewProps {
  name: string;
  scope: number;
  orientation: Orientation;
  units: Units;
  domain: Domain;
  depth: Depth;
  grid: VerticalGrid;
}
```

### Properties

- `name`

  Name of the [LogView](#logview) component. Used as identifier

- `scope`

  Scope of the depth values. Specified in centimeters. The standard PPI = 96 is used for calculations

- `orientation`

  <span style="color:grey">Not implemented yet</span>

- `units`

  <span style="color:grey">Not implemented yet</span>

- `domain`

  Minimum and maximum depth values. By default domain is set based on depth data. See [Domain](#domain) for more details

- `depth`

  Array of well depth values. Used to render [CurveTrack](#curvetrack), [Curve](#curve), [DepthTrack](#depthtrack) and other components

- `grid`

  Sets ticks and style of the main and secondary vertical grid lines. See [VerticalGrid](#verticalgrid) for more details

## CurveTrack

Component of the **LogView** that displays a group of curves on a single scale

![CurveTrack](/assets/CurveTrack.png)

### Interface

```TypeScript
interface CurveTrackProps {
  name: string;
  height: number;
  scale: Scale;
  grid: HorizontalGrid;
}
```

### Properties

- `name`

  Name of the [CurveTrack](#curvetrack) component

- `height`

  The height of the [CurveTrack](#curvetrack) component in horizontal orientation

- `scale`

  Linear or logarithmic scale of curve and grid values

- `grid`

  Sets ticks and style of the main and secondary horizontal grid lines. See [HorizontalGrid](#horizontalgrid) for more details

## Curve

Chart that displays a specific set of data

![Curve](/assets/Curve.png)

### Interface

```TypeScript
interface CurveProps {
  name: string;
  data: Data;
  style: LineStyle;
  domain: Domain;
  isContinuous: boolean;
}
```

### Properties

- `name`

  Name of the [Curve](#curve) component. Used as identifier

- `data`

  The values of the curve. Can be null

- `style`

  Properties of the curve line. See [LineStyle](#linestyle) for more details

- `domain`

  Domain of curve values. By default domain is set based on curve data. See [Domain](#domain) for more details

- `isContinuous`

  <span style="color:grey">Not implemented yet</span>

## DepthTrack

Track for depth data display

![DepthTrack](/assets/DepthTrack.png)

### Interface

```TypeScript
interface DepthTrackProps {
  name: string;
  height: number;
  main: DepthCurve;
  secondary: DepthCurve;
}
```

### Properties

- `name`

  Name of the [DepthTrack](#depthtrack) component

- `height`

  The height of the [DepthTrack](#depthtrack) component in horizontal orientation

- `main`

  Properties of the main depth track. See [DepthCurve](#depthcurve) for more details

- `secondary`

  <span style="color:grey">Not implemented yet</span>

## ModelCurve

Сhart for displaying a two-layer model of the near-well space

![ModelCurve](/assets/ModelCurve.png)

### Interface

```TypeScript
interface ModelCurveProps {
  name: string
  height: number;
  palette: Palette;
  borders: Borders;
  data: ModelData;
  domain: Domain;
}
```

### Properies

- `name`

  Name of the [ModelCurve](#modelcurve) component

- `height`

  The height of the [ModelCurve](#modelcurve) component in horizontal orientation

- `palette`

  Gradient properties for displaying the electrical resistivity of the model layers. See [Palette](#palette) for more details

- `borders`

  Properties of lines between models and layers. See [Borders](#borders) for more details

- `data`

  Array with model data. Displayed continuously, according to the specified left border. See [ModelData](#modeldata) for more details

- `domain`

  Domain of model data. By default domain is set based on models data. See [Domain](#domain) for more details

# 🎉 Types

## Domain

Minimum and maximum values of data array to be displayed

### Interface

```TypeScript
interface Domain {
  min: number;
  max: number;
}
```

### Properties

- `min`

  Minimum domain value

- `max`

  Maximum domain value

## VerticalGrid

Properties of the vertical grid in the horizontal orientation of the [LogView](#logview)

### Interface

```TypeScript
interface VerticalGrid {
  main: {
    style: LineStyle;
    interval: number;
  };
  secondary: {
    style: LineStyle;
    lines: number;
  };
}
```

### Properties

- `main`

  Properties of the main lines of the vertical grid

  - `style`

    The style of the main grid lines. See [LineStyle](#linestyle) for more details

  - `interval`

    The interval between the lines of the main grid

- `secondary`

  Properties of the secondary lines of the vertical grid

  - `style`

    The style of the secondary grid lines. See [LineStyle](#linestyle) for more details

  - `lines`

    The number of secondary lines between the main lines of the grid

## HorizontalGrid

Properties of the horizontal grid in the horizontal orientation of the [CurveTrack](#curvetrack). The style of the lines is defined by the [VerticalGrid](#verticalgrid)

### Interface

```TypeScript
interface HorizontalGrid {
  main: {
    lines: number;
    isDisplayed: boolean;
  };
  secondary: {
    lines: number;
    leftOffset: number;
    rightOffset: number;
    isDisplayed: boolean;
  };
}
```

### Properties

- `main`

  Properties of the main lines of the horizontal grid

  - `lines`

    The number of main grid lines

  - `isDisplayed`

    Specifies whether to display the main grid lines or not

- `secondary`

  Properties of the secondary lines of the horizontal grid

  - `lines`

    The number of secondary lines between the main grid lines

  - `leftOffset`

    <span style="color:grey">Not implemented yet</span>

  - `rightOffset`

    <span style="color:grey">Not implemented yet</span>

  - `isDisplayed`

    Specifies whether to display the secondary grid lines or not

## LineStyle

Line style of the curve, grid or model borders

### Interface

```TypeScript
interface LineStyle {
  color: Color;
  thickness: number;
  type: LineType;
}
```

### Properties

- `color`

  Line color in css format

- `thickness`

  Line width in pixels

- `type`

  <span style="color:grey">Not implemented yet</span>

## DepthCurve

Depth properties of the [DepthTrack](#depthtrack)

### Interface

```TypeScript
interface DepthCurve {
  name: string;
  color: Color;
  floatingPoint: number;
}
```

### Properties

- `name`

  Depth name. Displayed on the [DepthTrack](#depthtrack)

- `color`

  Color of the depth values and labels

- `floatingPoint`

  <span style="color:grey">Not implemented yet</span>

## Palette

Gradient properties

### Interface

```TypeScript
interface Palette {
  gradient: Gradient;
  domain: Domain;
  scale: Scale;
}
```

### Properties

- `gradient`

  Array with gradient colors. See [Gradient](#gradient) for more details

- `domain`

  Domain of the gradient data. See [Domain](#domain) for more details

- `scale`

  <span style="color:grey">Not implemented yet</span>

## Gradient

Properties of the linear gradient. Describes the color change along a straight line

### Interface

```TypeScript
interface GradientColor {
  value: Color;
  position: number;
}

type Gradient = GradientColor[];
```

### Properties

- `value`

  Color value of the gradient in css format

- `position`

  Color position in the gradient

## Borders

The style of horizontal and vertical lines

### Interface

```TypeScript
interface Borders {
  horizontal: LineStyle;
  vertical: LineStyle;
}
```

## ModelData

Array of two-layer models of the near-well space

### Interface

```TypeScript
interface ModelValue {
  x: number;
  y: number;
  alpha: number;
  roUp: number;
  roDown: number;
}

type ModelData = ModelValue[];
```

### Properties

- `x`

  The left depth boundary of the model. Specified in [LogView](#logview) units

- `y`

  The upper boundary of the beginning of the layer. Specified in meters

- `alpha`

  The angle of inclination of the upper layer of the model. Specified in degrees

- `roUp`

  Electrical resistivity of the upper layer. Specified in Om \* m

- `roDown`

  Electrical resistivity of the down layer. Specified in Om \* m

# 📒 Usage

## Import

All library components are located in the geochart package

```JavaScript
import { LogView, Curve, CurveTrack, DepthTrack } from 'geochart';
```

## Example

Place the LogView component in the beginning - this is the workspace for plotting. Then pass the depth data to the component and other parameters at your choice

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

Now place the CurveTrack as a child element - this is a component for grouping graphs. Set the parameters you need

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

Finally, add curves: specify the data, name (must be unique for track), color, range and so on

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

Don't forget to add DepthTrack

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

The following charts should be rendered by geochart
![alt text](/assets/Example.png)
