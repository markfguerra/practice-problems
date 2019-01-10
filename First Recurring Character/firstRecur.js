/*
Aim: Write a function that outputs the first recurring
character in a string.

If all the characters are unique, or if the input is invalid,
return undefined.
*/

/*
This code runs successfully in Node, Chrome, and Firefox.

To run this code:
$ node thisFile.js

You can also paste it directly into your browser console.
*/

/*
The runTests() function runs my test cases through the
solution, and checks the results for correctness.
It displays a success\failure message, the input, the output,
and the expected output.
*/
runTests();

/**
Author: Mark Guerra

My solution: Use a map structure to track which characters
have been seen before, then return the first character that
recurs. In this case, the map is a regular Javascript object.

Iterate over the characters in the string from beginning to
end. Check if the current character has been seen previously
by checking if it exists in the map structure.
If it does not exist on the map, add it, then move on to the
next character.
If it exists on the map already, the character has been seen
before; it is a recurring character. Exit the function and
return that character.

This solution is O(n), where n is the length of the input
string. This means that in the worst case, the loop would
execute for every single character in the input string. This
happens when the input string has no recurring characters,
or if the first recurring character happens to be the last
character in the string. In either case, each character
would need to be examined before coming up with an answer. By
contrast, if a recurring character is found earlier in the
string, the function can exit the loop early with the correct
answer in hand.

At O(n), the runtime gets worse as the string gets longer,
however the workload does not grow as quickly as it would
for a more naive solution that runs at O(n^2).

-----

Parameter 'str': The input string
Returns: The first character that recurs in 'str'.
*/
function firstRecur(str) {
	if (typeof(str) !== 'string') {
		// This check implicitly catches null and undefined
		return undefined;
	}

	// Create an object which we will use as a map to track
	// which characters have been seen before.
	var seenChars = {};

	// Iterate over every character in the string
	for (var i in str) {
		var thisChar = str[i];

		if (seenChars.hasOwnProperty(thisChar)) {
			// thisChar has been found previously, because
			// it already exists on the seenChars map.
			// That makes this the first recurring character.
			return thisChar;
		} else {
			// thisChar has not been seen before.
			// Add it to the seenChars map, and move on to
			// the next character.
			seenChars[thisChar] = true;
		}

	}

	// We've examined the whole string and found no recurring
	// characters. This is the worst case runtime.
	return undefined;
}

/** Convenience function for printing values more nicely */
function easyPrint(str) {
	// Handle non-strings by displaying their type instead.
	if (typeof(str) !== 'string') {
		if (str === null)
			return "null"
		else if (Array.isArray(str))
			return 'array';
		else
			return typeof(str);
	}

	// Handle empty strings instead of displaying a blank
	if (str === '') {
		return "(empty)";
	}

	// Surround any other strings with single quotes
	return "'" + str + "'";
};

/** Runs a single test case */
function test(inputString, expectedOutput) {
	// Define which function is being tested.
	// Change this line to test alternate implementations.
	var functionToTest = firstRecur;

	// Execute the function being tested
	var result = functionToTest(inputString);

	// An array to be used as a string builder to generate
	// the log message
	var sb = [];

	if (result === expectedOutput) {
		sb.push("Test Success!");
	} else {
		sb.push("Test Fail!");
	}

	sb.push("\tIn: ");
	sb.push(easyPrint(inputString));
	sb.push("\t\tOut: ");
	sb.push(easyPrint(result));
	sb.push("\t\tExpected: ");
	sb.push(easyPrint(expectedOutput));

	// Join the 'sb' array into a string, then output it
	var logMessage = sb.join('');
	console.log(logMessage);
}


/** Runs all my test cases */
function runTests() {
	// No recurring characters
	test("abc", undefined);

	// Recurring character at the beginning
	test("aabc", "a");

	// Recurring character in the middle
	test('abbc', 'b');

	// Recurring character at the end
	test('abcc', 'c');

	// Multiple recurring charaters.
	// The first one should be returned.
	test('aabbcc', 'a');

	// These edge cases should all return undefined
	test('a', undefined);
	test('', undefined);
	test([], undefined);
	test({}, undefined);
	test(5, undefined);
	test(null, undefined);
	test(undefined, undefined);
}
