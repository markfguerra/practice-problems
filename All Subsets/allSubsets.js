/*
Aim: Write a function that finds all subsets of a given set,
and outputs them to the screen in any order.

The input set will take the form of an array. You can assume
that each element in the array is unique.
*/

/*
This code runs successfully in Node, Chrome, and Firefox.

To run this code:
$ node thisFile.js

You can also paste it directly into your browser console.
*/

// Example usage: Every subset of the set {a, b, c}
printAllSubsets(['a', 'b', 'c']);

/**
Author: Mark Guerra

My solution: A recursive function, in which one item in the
input set is considered per recursive call. Each call creates
the subsets that include that item, then calls itself on the
remaining items. It then creates the subsets that do not
include that item, and again calls itself to do all this for
the remaining items in the input set.

When there are no remaining items to include or exclude, the
subset is complete, and it uses a convenience function to
output the subset to the screen and return to the previous
function call.

It will generate 2^n subsets, where n is the number of items
in the input set. That's nice, because 2^n is exactly as many
subsets as there can be for a given set. As a result, the
runtime is O(2^n).
*/
function printAllSubsets(inputSet) {
	// Subset is a working variable representing a subset
	// we're in the process of constructing.
	// In this variable, when subset[x] === undefined,
	// that means inputSet[x] is not in this subset.
	// Otherwise, we expect subset[x] === inputSet[x]
	// When we render it to the screen, we will skip the
	// undefined values.
	var subset = [];

	// Local variables inputSet and subset are accessed by
	// the function recursiveStep(). This is taking advantage
	// of Javascript quirk. Alternatively, they could have
	// been passed as parameters of recursiveStep().

	// The recursive function.
	// Parameter 'i' represents an index of an item belonging
	// to inputSet or subset.
	var recusiveStep = function(i) {

		if (i !== inputSet.length) {
			// Construct subsets including and excluding
			// the item at inputSet[i]

			// Make a subset that does not include inputSet[i]
			subset[i] = undefined;
			// Create the rest of that subset recursively
			recusiveStep(i+1);

			// Make a subset that includes inputSet[i]
			subset[i] = inputSet[i];
			// Create the rest of that subset recursively
			recusiveStep(i+1);
		} else {
			// When i === inputSet.length, the subset is fully
			// constructed

			// Output the subset to the screen
			easyPrint(subset);
		}
	};

	// Process the inputSet recursively, starting at
	// Element 0
	recusiveStep(0);
}

/**
Convenience function to print a subset to the screen in a
readable way.

A quick and dirty implementation might look like this:
  console.log(arr);

But be careful, if your subset has any undefined values, the
output will look a bit ugly.
  [ 'a', undefined, 'c' ]

The same input thru this function looks like this:
  {a,c}
*/
function easyPrint(arr) {
	// Create an output array which will contain any element
	// in arr that is not undefined.
	var output = [];
	for (var i = 0; i < arr.length; i++) {
		if (typeof(arr[i]) !== 'undefined') {
			output.push(arr[i]);
		}
	}

	// Print the output array
	if (output.length === 0) {
		console.log("{}");
	} else {
		console.log("{" + output.join() + "}");
	}
}
