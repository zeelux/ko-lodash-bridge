# ko-lodash-bridge v0.0.1

__ko-lodash-bridge__ is a helper library that bridges the gap between lodash and KnockoutJS. 

## Overview 

Out of the box [lodash](https://lodash.com/) doesn't work well with [KnockoutJS](http://knockoutjs.com/).
The filter method is a good example of the problem. When filtering an array that contains objects with 
properties that are knockout observables or computeds, you cannot use the object literal (_.matches) shorthand
method. Instead you must always use the callback method where you are responsible for unwrapping the observable 
and making the comparison yourself.

Take this example from the lodash documentation.
```JavaScript
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// using the `_.matches` callback shorthand
_.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
// → ['barney']
```

If we modify this example to use observables for each of the properties on the objects in the array such as this:
```JavaScript
var users = [
  { 'user': ko.observable('barney'), 'age': ko.observable(36), 'active': ko.observable(true) },
  { 'user': ko.observable('fred'),   'age': ko.observable(40), 'active': ko.observable(false) }
];
```

then we will have to also change our usage of lodash's filter method because the original version will no longer work.
```JavaScript
// using the `_.matches` callback shorthand
_.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user'); 
// → []

// using the verbose callback syntax
_.pluck(_.filter(users, function(user) {
    return (user.age() === 36 && user.active() === true);
}), 'user');
// → ['barney']
```

__ko-lodash-bridge__ aims to solve this problem and in doing so enable the `_.matches` callback syntax even when
filtering based on the values stored in knockout observables. All you need to do is load _ko-lodash-bridge_ and then 
use lodash as you would have before. 

```HTML
	<script type="text/javascript" src="ko-lodash-bridge.js"></script>
```
```JavaScript
var users = [
  { 'user': ko.observable('barney'), 'age': ko.observable(36), 'active': ko.observable(true) },
  { 'user': ko.observable('fred'),   'age': ko.observable(40), 'active': ko.observable(false) }
];

// using the `_.matches` callback shorthand
_.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user'); 
// → ['barney']
```

