import {useCallback, useContext} from "react";
import {Context} from "../index";

export const useFetch = () => {
    const {loading} = useContext(Context)

    const request = useCallback(async ({url, method = 'GET', body = null, headers = {}}) => {

        if (!url) throw new Error('no url found');

        loading.setLoading(true)

        if (body && typeof body !== 'string') {
            body = JSON.stringify(body)
            headers = {
                "Content-Type": "application/json",
                ...headers
            }
        }

        try {
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            loading.setLoading(false)

            return data

        } catch (e) {
            loading.setLoading(false)
            throw e
        }

    }, [loading])

    return {request, loading}
}