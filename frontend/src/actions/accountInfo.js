import { ACCOUNT_INFO } from './types';
import {fetchFromAccount} from './account';

export const fetchAccountInfo = () => fetchFromAccount({
    endpoint: 'info',
    options: { credentials: 'include' },
    FETCH_TYPE: ACCOUNT_INFO.FETCH,
    ERROR_TYPE: ACCOUNT_INFO.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_INFO.FETCH_SUCCESS
});