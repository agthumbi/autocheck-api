
import { Injectable } from '@nestjs/common';
import { Logic } from '../logic/index'


@Injectable()
export class WordsService {



    constructor(private readonly logic: Logic) { }




    async getMost10WordsInTitlesLast25Stories() {

        const response = this.logic.getResponse('https://hacker-news.firebaseio.com/v0/newstories.json', 25);
        const storyIdRaw = await this.logic.formatResponse(response);
        const storyIdList = await this.logic.formatResponse(storyIdRaw[0])
        let words = ''
        //iterate to get all the stories per id
        for await (let storyId of storyIdList) {

            let res = this.logic.getResponse(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, 0)
            let formatRes = await this.logic.formatResponse(res);

            let json = JSON.parse(JSON.stringify(formatRes[0]))

            let stories = this.logic.getObjectStories(json)

            words += stories.title.toLocaleLowerCase()

        }
        //get frequent words
        let fwords = this.logic.countRepeatedWords(words)

        let entries = Object.entries(fwords)
        //get length so that I can represent 10 most ocurring words
        let count: number = entries.length
        //get starting point to represent 10 most ocurring words
        let sliceFrom = count - 10
        //sort  10 most ocurring words
        let sorted = entries.sort((a, b) => (a[1] as number) - (b[1] as number)).slice(sliceFrom, count);

        const finalResult = Object.fromEntries(sorted)
        //initialize the message to send back to the user to print frequent occuring words
        let frequencywords = ''
        Object.entries(finalResult).reduce(
            (obj, [key, value]) => {

                frequencywords += `'${key}' have ${value} words , `

                return null;
            },
            {}
        );
        if (frequencywords != '') {
            return { code: 0, message: frequencywords };
        }
        else {
            return {
                code: 1,
                messgae: 'No Record(s)'
            }
        }

    }

    async getMost10WordsInTitlesExactAWeek() {
        const response = await this.logic.getResponse('https://hacker-news.firebaseio.com/v0/beststories.json', 0);
        const storyIdRaw = await this.logic.formatResponse(response);
        const storyIdList = await this.logic.formatResponse(storyIdRaw[0])
        let words = ''
        for await (let storyId of storyIdList) {

            let res = await this.logic.getResponse(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, 0)
            let formatRes = await this.logic.formatResponse(res);

            let json = JSON.parse(JSON.stringify(formatRes[0]))

            let stories = this.logic.getObjectStories(json)
            var apitime = new Date(stories.time * 1000)
            var current = new Date()

            const diffTime = Math.abs(current.valueOf() - apitime.valueOf());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays == 6) {

                words += stories.title.toLocaleLowerCase()
            }



        }

        //get frequent words
        let fwords = this.logic.countRepeatedWords(words)

        let entries = Object.entries(fwords)
        //get length so that I can represent 10 most ocurring words
        let count: number = entries.length
        //get starting point to represent 10 most ocurring words
        let sliceFrom = count - 10
        //sort  10 most ocurring words
        let sorted = entries.sort((a, b) => (a[1] as number) - (b[1] as number)).slice(sliceFrom, count);

        const finalResult = Object.fromEntries(sorted)
        //initialize the message to send back to the user to print frequent occuring words
        let frequencywords = ''
        Object.entries(finalResult).reduce(
            (obj, [key, value]) => {

                frequencywords += `'${key}' have ${value} words , `

                return null;
            },
            {}
        );
        //response back to the consumer
        if (frequencywords != '') {
            return { code: 0, message: frequencywords };
        }
        else {
            return {
                code: 1,
                messgae: 'No Record(s)'
            }
        }
    }
    async getMost10WordsInTitles10kKarma() {

        const response = await this.logic.getResponse('https://hacker-news.firebaseio.com/v0/topstories.json', 0);
        const storyIdRaw = await this.logic.formatResponse(response);
        const storyIdList = await this.logic.formatResponse(storyIdRaw[0])
        let words = ''
        for await (let storyId of storyIdList) {

            let res = await this.logic.getResponse(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, 0)
            let formatRes = await this.logic.formatResponse(res);

            let json = JSON.parse(JSON.stringify(formatRes[0]))

            let stories = this.logic.getObjectStories(json)
            let userID = stories.by
            res = await this.logic.getResponse(`https://hacker-news.firebaseio.com/v0/user/${userID}.json?`, 0)
            formatRes = await this.logic.formatResponse(res);

            json = JSON.parse(JSON.stringify(formatRes[0]))

            let users = this.logic.getObjectUser(json)
            ///filter 10k karma
            if (users.karma > 9999) {
                for await (let storyId of users.submitted.slice(0, 6)) {
                    let res = await this.logic.getResponse(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, 0)
                    let formatRes = await this.logic.formatResponse(res);

                    let json = JSON.parse(JSON.stringify(formatRes[0]))

                    let stories = this.logic.getObjectStories(json)

                    words += stories.title != undefined ?? stories.title.toLocaleLowerCase()
                }


            }




        }
        //get frequent words
        let fwords = this.logic.countRepeatedWords(words)

        let entries = Object.entries(fwords)
        //get length so that I can represent 10 most ocurring words
        let count: number = entries.length
        //get starting point to represent 10 most ocurring words
        let sliceFrom = count - 10
        //sort  10 most ocurring words
        let sorted = entries.sort((a, b) => (a[1] as number) - (b[1] as number)).slice(sliceFrom, count);

        const finalResult = Object.fromEntries(sorted)
        //initialize the message to send back to the user to print frequent occuring words
        let frequencywords = ''
        Object.entries(finalResult).reduce(
            (obj, [key, value]) => {

                frequencywords += `'${key}' have ${value} words , `

                return null;
            },
            {}
        );
        //response back to the consumer
        if (frequencywords != '') {
            return { code: 0, message: frequencywords };
        }
        else {
            return {
                code: 1,
                messgae: 'No Record(s)'
            }
        }





    }





}