export class CreateTodoDto{
    constructor(
        public readonly text:string,
        public readonly createdAt:Date = new Date(),
        public readonly completedAt:boolean = false,
    ){
        
    }

    static create(props: {[key:string]: any}): [string?, CreateTodoDto?]{
        const {text} = props;

        if(!text || text.length === 0) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDto(text)];
    }
}