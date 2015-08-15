# angular-localdate

Local date support for AngularJS

## Motivation

Unfortunately HTML 5 is lacking an input type for local dates (that is, dates without a time part and without timezone
information). An example for a "local date" is a birth date, which should include neither the timezone nor the exact
time of day.

Using an `<input type="date">` for a local date in an AngularJS-managed form comes with several problems:

* AngularJS parses the input into a Javascript `Date` object, which is basically a timestamp. There is no way to omit
 time or timezone information from a `Date`.
* By default, AngularJS attaches the browser's timezone information to the date. This is problematic because it means
 that dates in "positive" timezones (e.g. GMT+1) will have a local date part that is actually on the previous day.
 The workaround is to use `ng-model-options="{timezone: 'UTC'}"` on the input tag to guarantee UTC datetimes.
* Serializing a `Date` to JSON will always produce a full ISO-8601 datetime string. This could lead to problems if the
 back-end on the receiving end expects a pure date (e.g. the Jackson mapping for java.time.LocalDate or joda-time's
 LocalDate).

## Features

This module provides a small directive that overcomes these problems:

* It automatically uses the UTC timezone for local dates;
* It overwrites the `toJSON()` function for the Date objects so it outputs a pure date string. (This works with
 `JSON.stringify()`, `angular.toJson()` as well as the `json` filter).

## Installation

First, install the module using bower:

    bower install angular-localdate
    
Then, import the module in your HTML code (after angular.js, of course):

```html
<script src="bower_components/angular-localdate/dist/angular-localdate.min.js">
```

Declare a dependency on `"angular-localdate"` in your own module:

```javascript
angular.module("myModule", ["angular-localdate"]);
```

## Usage

Simply use the `local-date` attribute on your `<input type="date">` element:

```html
<form>
    <input type="date" ng-model="..." local-date>
</form>
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)