import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from 'rxjs/operators'
import { AxiosResponse } from 'axios';
import { Observable } from "rxjs";
import * as rxjs from 'rxjs'
import * as rxops from 'rxjs/operators'
import { Stories } from "src/interface/Stories";
import { Users } from "src/interface/Users";

export interface Raw<T> {
    0: T
}

@Injectable()
export class Logic {
    constructor(private httpService: HttpService) { }

    //get response
    getResponse(url: string, slice: number): Observable<Array<Object>> {

        return this.httpService
            .get(url)
            .pipe(
                map((axiosResponse: AxiosResponse) => {
                    //console.log(axiosResponse.data.slice(0, 1))
                    if (slice != 0)
                        return axiosResponse.data.slice(0, slice)
                    else
                        return axiosResponse.data

                }),
            );
    }
    //format response
    formatResponse(res) {
        return rxjs.lastValueFrom(rxjs.from(res).pipe(rxops.toArray()))

    }
    //Cast to Stories Class
    getObjectStories(json: any) {
        const transform = <T>(raw: Raw<T>): T => raw[0];
        const rawMedia: Raw<Stories> = {
            0: json
        };

        const stories: Stories = transform<Stories>(rawMedia);
        return stories
    }
    //Cast to Users Class
    getObjectUser(json: any) {
        const transform = <T>(raw: Raw<T>): T => raw[0];
        const rawMedia: Raw<Users> = {
            0: json
        };

        const users: Users = transform<Users>(rawMedia);
        return users
    }
    //get frequest words
    countRepeatedWords(sentence: string) {
        let words = sentence.split(" ");
        let wordMap = {};

        for (let i = 0; i < words.length; i++) {
            let currentWordCount = wordMap[words[i]];
            let count = currentWordCount ? currentWordCount : 0;
            wordMap[words[i]] = count + 1;
        }
        return wordMap;
    }
}





