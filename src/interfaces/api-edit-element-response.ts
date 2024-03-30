import { APIResponse } from '@/interfaces/api-response';

export interface ApiEditElementResponse extends Omit<APIResponse, "usage"> { }