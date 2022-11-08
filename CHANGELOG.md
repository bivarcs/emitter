# Changelog
All notable changes to this project will be documented in this file.

## [0.0.7] - 2022-11-08
### Changed features
- `emit()` now returns EmitterEvent. Now you can use it in various ways such as filters, `preventDefault()`, and so on.
- Changed the interface of EmitterEvent. The `data` is no longer always present.
