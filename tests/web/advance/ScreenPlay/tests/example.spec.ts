
import { test } from '../../ScreenPlay/fixture/actors';
import { SecureScreen } from '../src/screens/SecureScreen';
import { LoginToMyApp } from '../src/web/tasks/LogIn';
import { Element } from '../src/web/questions/Element';

test.describe('First example preparing over api', () => {
    test.beforeAll(async ({ adminActor }) => {
        // Do something
    });

    test.afterAll(async ({ adminActor }) => {
        await adminActor.attemptsTo(
            // Attempts to do something
        );
    });

    test('Test admin could login to application via UI', async ({ adminActor }) => {
        await adminActor.attemptsTo(
            LoginToMyApp.viaWeb(),
            // Other tasks here
        );
        // Here are validations / questions
        await adminActor.asks(Element.toBe.visible(SecureScreen.LOGOUT_BUTTON));

    });
});