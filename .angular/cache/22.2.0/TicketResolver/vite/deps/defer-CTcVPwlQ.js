import { ql as Observable } from "./core-jBE-p7u1.js";
import { o as innerFrom } from "./_platform_location-chunk-BHxR9wtK.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/defer.js
function defer(observableFactory) {
	return new Observable(function(subscriber) {
		innerFrom(observableFactory()).subscribe(subscriber);
	});
}
//#endregion
export { defer as t };
