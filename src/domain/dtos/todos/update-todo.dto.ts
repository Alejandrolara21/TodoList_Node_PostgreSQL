
export class UpdateTodoDto{
    constructor(
        public readonly id:number,
        public readonly text?:string,
        public readonly createdAt?:Date,
        public readonly completedAt?:boolean,
    ){
        
    }

    get values(){
        const returnObj: {[key:string]:any} = {};
        if(this.text) returnObj.text = this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(props: {[key:string]: any}): [string?, UpdateTodoDto?]{
        const {id, text, completedAt, createdAt} = props;

        if(!id || isNaN(id)) return ['id must be a valid number', undefined];

        let newCreateAt = createdAt;
        if (createdAt){
            newCreateAt = new Date(createdAt);
            if (newCreateAt.toString() === 'Invalid Date'){
                return ['CompleteAt must be a valid date.', undefined]
            }
        }

        let newCompleteAt = completedAt;
        if (completedAt){
            newCompleteAt = JSON.parse(completedAt.toLowerCase()); 
            if(typeof newCompleteAt !== 'boolean'){
                return ['CompleteAt must be a valid boolean.', undefined]
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCreateAt, newCompleteAt)];
    }
}