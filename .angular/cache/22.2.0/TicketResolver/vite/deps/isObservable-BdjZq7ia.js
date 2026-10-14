import { ql as Observable, ru as isFunction } from "./core-jBE-p7u1.js";
//#region node_modules/rxjs/dist/esm5/internal/util/isObservable.js
function isObservable(obj) {
	return !!obj && (obj instanceof Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
}
//#endregion
export { isObservable as t };
