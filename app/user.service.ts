import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ServerError } from "./utils/error";
import { UserData } from "./reducers/user.reducer";


const ROOT_URL = 'http://localhost:9090/api';

export interface UserError {
    error: ServerError,
    httpCode: number,
}

export interface AuthenticationResponse {
    user: UserData,
    token: string,
}

@Injectable()
class UserService {
    constructor(private http: HttpClient) {}

    signUp(data: any) {
        return this.http.post(
            `${ROOT_URL}/user/signUp`,
            data,
            { observe: 'response' },
        );
    }
}

export default UserService;