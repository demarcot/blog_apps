
export class Blog
{
    public _id: string;
    public title: string;
    public body: string;
    public author: string;
    public likes: number;

    constructor(title: string, body: string, author: string, likes: number, id?: string) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.author = author;
        this.likes = likes;
    }
}