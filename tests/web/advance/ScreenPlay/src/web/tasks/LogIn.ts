
import { Task, Actor } from '../..';
import { LogInScreen } from '../../screens/LogInScreen';
import { Click } from '../actions/Click';
import { Fill } from '../actions/Fill';
import { Navigate } from '../actions/Navigate';
import { Type } from '../actions/Type';
import { Wait } from '../actions/Wait';

/**
 * Login via Web UI
 * 
 * Login via API: Send Login request to API to obtain the bearer token.
 */
export class LoginToMyApp extends Task {

    private constructor() {
        super();
    }

    public async performAs(actor: Actor): Promise<any> {
            return await actor.attemptsTo(
                Navigate.to('https://the-internet.herokuapp.com/login'),
                Fill.in(LogInScreen.USERNAME_TEXTBOX, 'tomsmith'),
                Type.in(LogInScreen.PASSWORD_TEXTBOX, 'SuperSecretPassword!'),
                Click.on(LogInScreen.SUBMIT_BUTTON),
                Wait.forLoadState('networkidle'),
            );
    }

    /**
     * Login with the actor username + password and navigate to the given Opportunity URL.
     *
     */
    public static viaWeb(): LoginToMyApp {
        return new LoginToMyApp();
    }
}