import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Navigate to a URL using the specified url string.
 */
export class Close extends Action {
    private constructor() {
        super();
    }

    /**
     * navigate to the specified URL.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<any> {
        return BrowseTheWeb.as(actor).close();
    }

    /**
     * Use the page to navigate to a certain URL.
     *
     */
    public static page(): Close {
        return new Close();
    }
}
