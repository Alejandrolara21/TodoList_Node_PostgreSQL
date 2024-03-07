
export class TodoEntity{
    constructor(
        public id: number,
        public text: string,
        public completedAt: boolean,
        public createdAt?: Date|null,
    ){

    }

    get isCompleted(){
        return !!this.completedAt;
    }
    
    public static fromObject(object: {[key:string]: any}): TodoEntity{
        const {id, text, completedAt, createdAt} = object;
        if(!id) throw 'Id is Required';
        if(!text) throw 'Text is Required';
        
        let newCreatedAt;
        if(createdAt){
            newCreatedAt = new Date(createdAt);
            if(isNaN(newCreatedAt.getTime())) throw 'CreatedAt is not valid Date';
        }

        if (completedAt && typeof completedAt !== 'boolean') throw 'CompleateAt is not valid boolean';

        return new TodoEntity(
            id,
            text,
            completedAt,
            createdAt
        )
    }
    
}