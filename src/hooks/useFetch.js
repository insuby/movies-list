import {useCallback, useContext} from 'react';
import {Context} from '../index';

export const useFetch = () => {
    const {loader} = useContext(Context)

    const request = useCallback(async ({url, method = 'GET', body = null, headers = {}}) => {
        if (!url) throw new Error('no url found');

        loader.setLoading(true)

        if (body && typeof body !== 'string') {
            body = JSON.stringify(body)
            headers = {'Content-Type': 'application/json', ...headers}
        }

        try {
            const data = await fetch(url, {method, body, headers}).then(r => r.json())

            loader.setLoading(false)

            return data
        } catch (e) {
            loader.setLoading(false)
            throw e
        }
    }, [loader])

    return {request, loader}
}
