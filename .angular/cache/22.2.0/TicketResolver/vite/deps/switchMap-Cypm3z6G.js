import { Kl as operate, Wl as createOperatorSubscriber } from "./core-jBE-p7u1.js";
import { t as innerFrom } from "./innerFrom-CGxH06uh.js";
import { a as popScheduler, t as from } from "./from-EqyWiCr0.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = popScheduler(args);
	return from(args, scheduler);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
function switchMap(project, resultSelector) {
	return operate(function(source, subscriber) {
		var innerSubscriber = null;
		var index = 0;
		var isComplete = false;
		var checkComplete = function() {
			return isComplete && !innerSubscriber && subscriber.complete();
		};
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			innerSubscriber === null || innerSubscriber === void 0 || innerSubscriber.unsubscribe();
			var innerIndex = 0;
			var outerIndex = index++;
			innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
				return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
			}, function() {
				innerSubscriber = null;
				checkComplete();
			}));
		}, function() {
			isComplete = true;
			checkComplete();
		}));
	});
}
//#endregion
export { of as n, switchMap as t };
