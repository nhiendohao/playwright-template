import { test as base } from '@playwright/test';
import { Actor } from '../src';
import { UseActor } from '../src/actors/\bProjectActors';


type MyActors = {
    adminActor: Actor;
    anotherActor: Actor;
};

export const test = base.extend<MyActors>({
    adminActor: async ({ browser, request }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const adminActor = UseActor(page,'Admin Actor', `${process.env.BASE_USERNAME}`, `${process.env.BASE_PASSWORD}`);
        await use(adminActor);
    },
    anotherActor: async ({ browser, request }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const anotherActor = UseActor(page, 'Another Actor Defined By You', `${process.env.BASE_USERNAME}`, `${process.env.BASE_PASSWORD}`);
        anotherActor.with('page', page);

        await use(anotherActor);
    },
});

export { expect } from '@playwright/test';