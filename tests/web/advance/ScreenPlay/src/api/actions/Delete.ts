import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP DELETE Request.
 */
export class Delete extends ARequest {
    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.DELETE, this.url, this.headers, this.responseBodyFormat);
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static from(url: string): Delete {
        return new Delete(url);
    }

    /**
     * Add headers to the HTTP DELETE request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Delete {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Delete {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
