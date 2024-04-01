import { APIResponse } from '@/interfaces/api-response';

export interface ApiImgResponse extends Omit<APIResponse, "usage"> {}