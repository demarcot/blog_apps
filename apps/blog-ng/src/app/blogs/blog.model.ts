
export class Blog
{
    public id: string;
    public title: string;
    public body: string;
    public author: string;
    public likes: number;

    constructor(id: string, title: string, body: string, author: string, likes: number) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
        this.likes = likes;
    }
}