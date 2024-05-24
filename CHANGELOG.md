# Changelog

All notable changes to this project will be documented in this file.

### Guiding Principles

- Changelogs are _for humans_, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

### Added

### Changed

- Перенести ComponentProps к компонентам
- Сделать рефакторинг constants и custom hooks
- Изменить import из /components

### Deprecated

### Removed

### Fixed

### Security

## [0.0.1] - 2024-03-24

### Added

- Internal components for rendering: `DepthAxis`, `HorizontalGrid`, `VerticalGrid`.
- Scale for `LogView`. Specified in centimeters. The average PPI = 96 is used for calculation.
- Library types export. The `geochart/types` submodule has been added.
- The **Babel** plugin for generating backward compatible code.
- The **Terser** plugin to reduce the size of the bundle.

### Changed

- The horizontal grid is rendering based on the first `Curve` in the `CurveTrack`.
- The values for `DepthTrack` are generated based on the depth data: `domain` and `interval` (average step).
- Data on the `Axis` displayed in [Scientific notation](https://en.wikipedia.org/wiki/Scientific_notation) with order 4.
- The `name` field is used as the identifier for `Curve` in `CurveTrack`.
- Big data and functions are wrapped in `useMemo` and `useCallback` respectively.
- The shared logic is provided in custom hooks.

### Fixed

- `CurveTrack` going beyond the boundaries of `LogView` component. Fixed with scrolling.
- Calculating the logarithmic scale. Does not break at zero values. The primary and secondary lines of the horizontal grid are represented as: 1, 10, 100, 1000...
- Slow data rendering. Fixed with `useMemo` and `useCallback`.

[unreleased]: https://github.com/PeachMood/geochart/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/PeachMood/geochart/releases/tag/v0.0.1
