import { Page } from '@playwright/test';
import { Actor } from '..';
import { BrowseTheWeb } from '../web/abilities/BrowseTheWeb';


/**
 * create a screenplay actor using the following parameters.
 *
 * @param page a playwright page object.
 * @param actorName the name of the actor.
 * @param username the username of the actor.
 * @param password the password of the actor.
 * @constructor
 */
export function UseActor(page: Page, actorName: string, username: string, password: string): Actor {
    const actor = Actor.named(actorName)
        .with('username', username)
        .with('password', password)
        .can(BrowseTheWeb.using(page))

    return actor;
}