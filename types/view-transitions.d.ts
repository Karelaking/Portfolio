/**
 * Type augmentations for the View Transition API.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 */

interface ViewTransition {
	finished: Promise<void>;
	ready: Promise<void>;
	skipTransition: () => void;
	updateCallbackDone: Promise<void>;
}

interface Document {
	startViewTransition?: (callback: () => void) => ViewTransition;
}
