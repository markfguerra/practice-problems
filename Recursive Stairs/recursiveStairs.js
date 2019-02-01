/*
Aim: Write a function that finds all of the ways to climb
a set of stairs, assuming you can climb 1 or 2 steps at
a time.
	Implemented as numWaysToClimbStairs(numStairs);

Stretch goal: Write the same function, but allowing the user
to input the possible number of stairs you can climb per step
	Implemented as numWaysToClimbStairsFlex(numStairs, validSteps);
*/

/*
This code runs successfully in Node, Chrome, and Firefox.

To run this code:
$ node thisFile.js

You can also paste it directly into your browser console.
*/

// Example usage: The number of ways to climb 4 steps, while
// climbing either 1 or 2 steps at a time.
console.log(numWaysToClimbStairs(4));

// Example usage: The number of ways to climb 4 steps, while
// climbing either 1, 2, or 3 steps at a time.
console.log(numWaysToClimbStairsFlex(4, [1, 2, 3]));


/**
Author: Mark Guerra

My solution: A recursive function, in which a valid step (say, 1
stair) is taken, then the function calls itself with a reduced n.
It then takes the next valid step (say, 2 stairs) and again calls
itself with a reduced n.

When n reaches 0, a valid way to climb the stairs has been found.
When n is less than 0, the most recent step has left us in an 
invalid state, so that solution is not valid and shouln't be
counted.

When the function is called for a given N and a valid way to climb
is found, that value is cached in the variable 'solutions'. This
keeps the function from recomputing values which we've already
computed.

Runtime is O(2^n).
*/



// For this function, you can only climb stairs by 1 or 2 steps
function numWaysToClimbStairs(numStairs) {
	// stores the previously calculated solutions of recursiveStep(n)
	var solutions = [];

	var recursiveStep = function(n) {
		if (typeof solutions[n] !== 'undefined') {
			// Avoid recomputing for values of 'n' already computed
			return solutions[n];
		}

		if (n === 0) {
			// Reached the top of the stairs
			return 1;
		} else if (n < 0) {
			// Reached an invalid stair; a stair after the last stair
			// This isn't a valid solution, so return 0
			return 0;
		} else {
			var waysStartingOneStep = recursiveStep(n-1);
			var waysStartingTwoSteps = recursiveStep(n-2);

			var total = waysStartingOneStep + waysStartingTwoSteps;

			// Store the result for later reuse, so it won't need
			// to be recalculated if we call the function again
			// for the same value of n
			solutions[n] = total;

			return total;
		}
	}

	return recursiveStep(numStairs);
}

// For this function, you can only climb stairs by the step counts
// in the array validSteps.
// For example, to reproduce the above function and only allow steps
// of 1 or 2 stairs, you would call the function as follows
// numWaysToClimbStairsFlex(n, [1, 2]);
function numWaysToClimbStairsFlex(numStairs, validSteps) {
	// stores the previously calculated solutions of recursiveStep(n)
	var solutions = [];

	var recursiveStep = function(n) {
		if (typeof solutions[n] !== 'undefined') {
			// Avoid recomputing for values of 'n' already computed
			return solutions[n];
		}

		if (n === 0) {
			// Reached the top of the stairs
			return 1;
		} else if (n < 0) {
			// Reached an invalid stair; a stair after the last stair
			// This isn't a valid solution, so return 0
			return 0;
		} else {
			var total = 0;

			for (var s in validSteps) {
				total += recursiveStep(n - validSteps[s]);
			}

			// Store the result for later reuse, so it won't need
			// to be recalculated if we call the function again
			// for the same value of n
			solutions[n] = total;

			return total;
		}
	}

	return recursiveStep(numStairs);
}

