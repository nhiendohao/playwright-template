import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove from the Browser.
 */
export class Clear extends Action {
    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param actor
     */
    // eslint-disable-next-line class-methods-use-this
    public performAs(actor: Actor): Promise<any> {
        return BrowseTheWeb.as(actor).clearCookies();
    }

    /**
     * Clear all browser cookies.
     */
    public static cookies(): Clear {
        return new Clear();
    }
}
