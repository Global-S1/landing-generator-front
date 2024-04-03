import { Sections } from ".";

export interface LandingListResponse {
    data: Landing[];
}

export interface Landing {
    id:             string;
    initial_prompt: string;
    template:       string;
    sections:       Sections;
    history:        string[];
    total_tokens:   number;
    user_id:        string;
}
