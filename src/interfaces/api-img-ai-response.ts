import { APIResponse } from '@/interfaces/api-response';

export interface ApiImgAiResponse extends Omit<APIResponse, "usage"> {
    fileName: string;
    url: string
}