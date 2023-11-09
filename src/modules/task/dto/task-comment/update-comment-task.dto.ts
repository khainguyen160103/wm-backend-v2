import { IsNotEmpty, IsString } from 'class-validator'
export class UpdateCommentTaskDto { 
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    task_comment_id: number;  
}